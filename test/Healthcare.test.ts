import { expect } from "chai";
import { ethers } from "hardhat";
import { Healthcare } from "../typechain-types";

describe("Healthcare", function () {
  let healthcare: Healthcare;
  let owner: any;
  let doctor1: any;
  let doctor2: any;
  let patient1: any;
  let patient2: any;

  beforeEach(async function () {
    [owner, doctor1, doctor2, patient1, patient2] = await ethers.getSigners();

    const HealthcareFactory = await ethers.getContractFactory("Healthcare");
    healthcare = await HealthcareFactory.deploy();
    await healthcare.waitForDeployment();
  });

  describe("Doctor Registration", function () {
    it("Should register a doctor successfully", async function () {
      await expect(
        healthcare
          .connect(doctor1)
          .registerDoctor("Dr. Smith", "Cardiology", "LIC123")
      )
        .to.emit(healthcare, "DoctorRegistered")
        .withArgs(doctor1.address, "Dr. Smith", "Cardiology");

      const doctor = await healthcare.doctors(doctor1.address);
      expect(doctor.exists).to.be.true;
      expect(doctor.approved).to.be.true;
      expect(doctor.name).to.equal("Dr. Smith");
      expect(doctor.specialty).to.equal("Cardiology");
    });

    it("Should not allow duplicate doctor registration", async function () {
      await healthcare
        .connect(doctor1)
        .registerDoctor("Dr. Smith", "Cardiology", "LIC123");

      await expect(
        healthcare
          .connect(doctor1)
          .registerDoctor("Dr. John", "Neurology", "LIC456")
      ).to.be.revertedWith("Doctor already registered");
    });

    it("Should not allow doctor if already registered as patient", async function () {
      await healthcare.connect(doctor1).registerPatient("John Doe", 30);

      await expect(
        healthcare
          .connect(doctor1)
          .registerDoctor("Dr. Smith", "Cardiology", "LIC123")
      ).to.be.revertedWith("Cannot be both doctor and patient");
    });

    it("Should reject strings longer than 120 characters", async function () {
      const longString = "a".repeat(121);
      await expect(
        healthcare
          .connect(doctor1)
          .registerDoctor(longString, "Cardiology", "LIC123")
      ).to.be.revertedWith("String exceeds 120 characters");
    });
  });

  describe("Patient Registration", function () {
    it("Should register a patient successfully", async function () {
      await expect(
        healthcare.connect(patient1).registerPatient("John Doe", 30)
      )
        .to.emit(healthcare, "PatientRegistered")
        .withArgs(patient1.address, "John Doe");

      const patient = await healthcare.patients(patient1.address);
      expect(patient.exists).to.be.true;
      expect(patient.name).to.equal("John Doe");
      expect(patient.age).to.equal(30);
    });

    it("Should not allow duplicate patient registration", async function () {
      await healthcare.connect(patient1).registerPatient("John Doe", 30);

      await expect(
        healthcare.connect(patient1).registerPatient("Jane Doe", 25)
      ).to.be.revertedWith("Patient already registered");
    });

    it("Should not allow patient if already registered as doctor", async function () {
      await healthcare
        .connect(patient1)
        .registerDoctor("Dr. Smith", "Cardiology", "LIC123");

      await expect(
        healthcare.connect(patient1).registerPatient("John Doe", 30)
      ).to.be.revertedWith("Cannot be both doctor and patient");
    });

    it("Should reject invalid age", async function () {
      await expect(
        healthcare.connect(patient1).registerPatient("John Doe", 0)
      ).to.be.revertedWith("Invalid age");

      await expect(
        healthcare.connect(patient1).registerPatient("John Doe", 151)
      ).to.be.revertedWith("Invalid age");
    });
  });

  describe("Appointment Booking", function () {
    beforeEach(async function () {
      await healthcare
        .connect(doctor1)
        .registerDoctor("Dr. Smith", "Cardiology", "LIC123");
      await healthcare.connect(patient1).registerPatient("John Doe", 30);
    });

    it("Should book an appointment successfully", async function () {
      const futureTime = Math.floor(Date.now() / 1000) + 86400; // Tomorrow

      await expect(
        healthcare
          .connect(patient1)
          .bookAppointment(doctor1.address, futureTime, "Regular checkup")
      )
        .to.emit(healthcare, "AppointmentBooked")
        .withArgs(1, patient1.address, doctor1.address, futureTime);

      const appointments = await healthcare
        .connect(patient1)
        .getMyAppointmentsAsPatient();
      expect(appointments.length).to.equal(1);
      expect(appointments[0].patient).to.equal(patient1.address);
      expect(appointments[0].doctor).to.equal(doctor1.address);
    });

    it("Should not allow booking with past time", async function () {
      const pastTime = Math.floor(Date.now() / 1000) - 86400; // Yesterday

      await expect(
        healthcare
          .connect(patient1)
          .bookAppointment(doctor1.address, pastTime, "Regular checkup")
      ).to.be.revertedWith("Start time must be in the future");
    });

    it("Should not allow non-patients to book", async function () {
      const futureTime = Math.floor(Date.now() / 1000) + 86400;

      await expect(
        healthcare
          .connect(owner)
          .bookAppointment(doctor1.address, futureTime, "Regular checkup")
      ).to.be.revertedWith("Not a registered patient");
    });

    it("Should not allow booking with non-existent doctor", async function () {
      const futureTime = Math.floor(Date.now() / 1000) + 86400;

      await expect(
        healthcare
          .connect(patient1)
          .bookAppointment(patient2.address, futureTime, "Regular checkup")
      ).to.be.revertedWith("Doctor does not exist");
    });
  });

  describe("Notes", function () {
    beforeEach(async function () {
      await healthcare
        .connect(doctor1)
        .registerDoctor("Dr. Smith", "Cardiology", "LIC123");
      await healthcare.connect(patient1).registerPatient("John Doe", 30);

      const futureTime = Math.floor(Date.now() / 1000) + 86400;
      await healthcare
        .connect(patient1)
        .bookAppointment(doctor1.address, futureTime, "Regular checkup");
    });

    it("Should add a note successfully", async function () {
      await expect(
        healthcare
          .connect(doctor1)
          .addOrUpdateNote(1, "High blood pressure", "Take medication daily")
      )
        .to.emit(healthcare, "NoteAdded")
        .withArgs(1, doctor1.address);

      const note = await healthcare.getNote(1);
      expect(note.exists).to.be.true;
      expect(note.diagnosis).to.equal("High blood pressure");
      expect(note.prescription).to.equal("Take medication daily");
    });

    it("Should not allow non-doctors to add notes", async function () {
      await expect(
        healthcare
          .connect(patient1)
          .addOrUpdateNote(1, "Diagnosis", "Prescription")
      ).to.be.revertedWith("Not a registered doctor");
    });

    it("Should not allow doctor to add note to another doctor's appointment", async function () {
      await healthcare
        .connect(doctor2)
        .registerDoctor("Dr. Jones", "Neurology", "LIC456");

      await expect(
        healthcare
          .connect(doctor2)
          .addOrUpdateNote(1, "Diagnosis", "Prescription")
      ).to.be.revertedWith("Not your appointment");
    });
  });

  describe("Statistics", function () {
    beforeEach(async function () {
      await healthcare
        .connect(doctor1)
        .registerDoctor("Dr. Smith", "Cardiology", "LIC123");
      await healthcare
        .connect(doctor2)
        .registerDoctor("Dr. Jones", "Neurology", "LIC456");
      await healthcare.connect(patient1).registerPatient("John Doe", 30);
      await healthcare.connect(patient2).registerPatient("Jane Doe", 25);
    });

    it("Should return correct statistics", async function () {
      const stats = await healthcare.stats();
      expect(stats.totalDoctors).to.equal(2);
      expect(stats.totalPatients).to.equal(2);
      expect(stats.totalAppointments).to.equal(0);

      // Add an appointment
      const futureTime = Math.floor(Date.now() / 1000) + 86400;
      await healthcare
        .connect(patient1)
        .bookAppointment(doctor1.address, futureTime, "Checkup");

      const updatedStats = await healthcare.stats();
      expect(updatedStats.totalAppointments).to.equal(1);
    });
  });

  describe("List Functions", function () {
    beforeEach(async function () {
      await healthcare
        .connect(doctor1)
        .registerDoctor("Dr. Smith", "Cardiology", "LIC123");
      await healthcare
        .connect(doctor2)
        .registerDoctor("Dr. Jones", "Neurology", "LIC456");
      await healthcare.connect(patient1).registerPatient("John Doe", 30);
      await healthcare.connect(patient2).registerPatient("Jane Doe", 25);
    });

    it("Should list all doctors", async function () {
      const doctors = await healthcare.listDoctors();
      expect(doctors.length).to.equal(2);
      expect(doctors[0].name).to.equal("Dr. Smith");
      expect(doctors[1].name).to.equal("Dr. Jones");
    });

    it("Should list all patients", async function () {
      const patients = await healthcare.listPatients();
      expect(patients.length).to.equal(2);
      expect(patients[0].name).to.equal("John Doe");
      expect(patients[1].name).to.equal("Jane Doe");
    });
  });
});
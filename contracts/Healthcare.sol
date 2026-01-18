// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Healthcare {
    // Events
    event DoctorRegistered(address indexed doctor, string name, string specialty);
    event PatientRegistered(address indexed patient, string name);
    event AppointmentBooked(
        uint256 indexed appointmentId,
        address indexed patient,
        address indexed doctor,
        uint64 startTime
    );
    event NoteAdded(uint256 indexed appointmentId, address indexed doctor);

    // Enums
    enum AppointmentStatus {
        Booked,
        Completed,
        Cancelled
    }

    // Structs
    struct Doctor {
        address addr;
        string name;
        string specialty;
        string licenseId;
        bool exists;
        bool approved;
        uint256 createdAt;
    }

    struct Patient {
        address addr;
        string name;
        uint8 age;
        bool exists;
        uint256 createdAt;
    }

    struct Appointment {
        uint256 id;
        address patient;
        address doctor;
        uint64 startTime;
        string reason;
        AppointmentStatus status;
        uint64 createdAt;
    }

    struct Note {
        bool exists;
        uint256 appointmentId;
        address doctor;
        string diagnosis;
        string prescription;
        uint64 createdAt;
    }

    // Storage
    mapping(address => Doctor) public doctors;
    mapping(address => Patient) public patients;
    address[] public doctorAddresses; // Track doctor addresses for counting
    address[] public patientAddresses; // Track patient addresses for counting
    Appointment[] public appointments;
    mapping(uint256 => Note) public notes;

    uint256 public appointmentCounter;
    uint256 public totalDoctorsCount;
    uint256 public totalPatientsCount;

    // Modifiers
    modifier onlyDoctor() {
        require(doctors[msg.sender].exists, "Not a registered doctor");
        require(doctors[msg.sender].approved, "Doctor not approved");
        _;
    }

    modifier onlyPatient() {
        require(patients[msg.sender].exists, "Not a registered patient");
        _;
    }

    modifier requireRegistered() {
        require(
            doctors[msg.sender].exists || patients[msg.sender].exists,
            "User not registered"
        );
        _;
    }

    // String length validation (max 120 chars)
    modifier validStringLength(string memory str) {
        require(bytes(str).length <= 120, "String exceeds 120 characters");
        require(bytes(str).length > 0, "String cannot be empty");
        _;
    }

    // Functions

    /**
     * @dev Register a new doctor (auto-approved, no admin)
     */
    function registerDoctor(
        string memory name,
        string memory specialty,
        string memory licenseId
    )
        public
        validStringLength(name)
        validStringLength(specialty)
        validStringLength(licenseId)
    {
        require(!doctors[msg.sender].exists, "Doctor already registered");
        require(!patients[msg.sender].exists, "Cannot be both doctor and patient");

        doctors[msg.sender] = Doctor({
            addr: msg.sender,
            name: name,
            specialty: specialty,
            licenseId: licenseId,
            exists: true,
            approved: true, // Auto-approved
            createdAt: block.timestamp
        });

        doctorAddresses.push(msg.sender);
        totalDoctorsCount++;

        emit DoctorRegistered(msg.sender, name, specialty);
    }

    /**
     * @dev Register a new patient
     */
    function registerPatient(
        string memory name,
        uint8 age
    ) public validStringLength(name) {
        require(!patients[msg.sender].exists, "Patient already registered");
        require(!doctors[msg.sender].exists, "Cannot be both doctor and patient");
        require(age > 0 && age <= 150, "Invalid age");

        patients[msg.sender] = Patient({
            addr: msg.sender,
            name: name,
            age: age,
            exists: true,
            createdAt: block.timestamp
        });

        patientAddresses.push(msg.sender);
        totalPatientsCount++;

        emit PatientRegistered(msg.sender, name);
    }

    /**
     * @dev Get all doctors
     */
    function listDoctors() public view returns (Doctor[] memory) {
        Doctor[] memory doctorList = new Doctor[](doctorAddresses.length);
        for (uint256 i = 0; i < doctorAddresses.length; i++) {
            doctorList[i] = doctors[doctorAddresses[i]];
        }
        return doctorList;
    }

    /**
     * @dev Get all patients
     */
    function listPatients() public view returns (Patient[] memory) {
        Patient[] memory patientList = new Patient[](patientAddresses.length);
        for (uint256 i = 0; i < patientAddresses.length; i++) {
            patientList[i] = patients[patientAddresses[i]];
        }
        return patientList;
    }

    /**
     * @dev Book an appointment (patient only)
     */
    function bookAppointment(
        address doctor,
        uint64 startTime,
        string memory reason
    )
        public
        onlyPatient
        validStringLength(reason)
        returns (uint256)
    {
        require(doctors[doctor].exists, "Doctor does not exist");
        require(doctors[doctor].approved, "Doctor not approved");
        require(startTime > block.timestamp, "Start time must be in the future");

        appointmentCounter++;
        uint256 appointmentId = appointmentCounter;

        appointments.push(
            Appointment({
                id: appointmentId,
                patient: msg.sender,
                doctor: doctor,
                startTime: startTime,
                reason: reason,
                status: AppointmentStatus.Booked,
                createdAt: uint64(block.timestamp)
            })
        );

        emit AppointmentBooked(appointmentId, msg.sender, doctor, startTime);

        return appointmentId;
    }

    /**
     * @dev Doctor can book appointment for a patient
     */
    function bookAppointmentForPatient(
        address patient,
        uint64 startTime,
        string memory reason
    )
        public
        onlyDoctor
        validStringLength(reason)
        returns (uint256)
    {
        require(patients[patient].exists, "Patient does not exist");
        require(startTime > block.timestamp, "Start time must be in the future");

        appointmentCounter++;
        uint256 appointmentId = appointmentCounter;

        appointments.push(
            Appointment({
                id: appointmentId,
                patient: patient,
                doctor: msg.sender,
                startTime: startTime,
                reason: reason,
                status: AppointmentStatus.Booked,
                createdAt: uint64(block.timestamp)
            })
        );

        emit AppointmentBooked(appointmentId, patient, msg.sender, startTime);

        return appointmentId;
    }

    /**
     * @dev Get appointments for the calling patient
     */
    function getMyAppointmentsAsPatient()
        public
        view
        onlyPatient
        returns (Appointment[] memory)
    {
        uint256 count = 0;
        
        // Count matching appointments
        for (uint256 i = 0; i < appointments.length; i++) {
            if (appointments[i].patient == msg.sender) {
                count++;
            }
        }

        // Build result array
        Appointment[] memory result = new Appointment[](count);
        uint256 index = 0;
        
        for (uint256 i = 0; i < appointments.length; i++) {
            if (appointments[i].patient == msg.sender) {
                result[index] = appointments[i];
                index++;
            }
        }

        return result;
    }

    /**
     * @dev Get appointments for the calling doctor
     */
    function getMyAppointmentsAsDoctor()
        public
        view
        onlyDoctor
        returns (Appointment[] memory)
    {
        uint256 count = 0;
        
        // Count matching appointments
        for (uint256 i = 0; i < appointments.length; i++) {
            if (appointments[i].doctor == msg.sender) {
                count++;
            }
        }

        // Build result array
        Appointment[] memory result = new Appointment[](count);
        uint256 index = 0;
        
        for (uint256 i = 0; i < appointments.length; i++) {
            if (appointments[i].doctor == msg.sender) {
                result[index] = appointments[i];
                index++;
            }
        }

        return result;
    }

    /**
     * @dev Add or update a note for an appointment (doctor only)
     */
    function addOrUpdateNote(
        uint256 appointmentId,
        string memory diagnosis,
        string memory prescription
    )
        public
        onlyDoctor
        validStringLength(diagnosis)
        validStringLength(prescription)
    {
        require(appointmentId > 0 && appointmentId <= appointmentCounter, "Invalid appointment ID");
        
        // Find the appointment
        bool found = false;
        for (uint256 i = 0; i < appointments.length; i++) {
            if (appointments[i].id == appointmentId) {
                found = true;
                require(appointments[i].doctor == msg.sender, "Not your appointment");
                require(
                    appointments[i].status == AppointmentStatus.Booked ||
                    appointments[i].status == AppointmentStatus.Completed,
                    "Cannot add note to cancelled appointment"
                );
                break;
            }
        }
        require(found, "Appointment not found");

        notes[appointmentId] = Note({
            exists: true,
            appointmentId: appointmentId,
            doctor: msg.sender,
            diagnosis: diagnosis,
            prescription: prescription,
            createdAt: uint64(block.timestamp)
        });

        emit NoteAdded(appointmentId, msg.sender);
    }

    /**
     * @dev Get a note for an appointment
     */
    function getNote(uint256 appointmentId)
        public
        view
        returns (Note memory)
    {
        return notes[appointmentId];
    }

    /**
     * @dev Get statistics
     */
    function stats()
        public
        view
        returns (uint256 totalDoctors, uint256 totalPatients, uint256 totalAppointments)
    {
        totalDoctors = totalDoctorsCount;
        totalPatients = totalPatientsCount;
        totalAppointments = appointments.length;
    }

    /**
     * @dev Get total number of appointments
     */
    function getTotalAppointments() public view returns (uint256) {
        return appointments.length;
    }

    /**
     * @dev Get all appointments (for doctor/admin view)
     */
    function getAllAppointments() public view returns (Appointment[] memory) {
        return appointments;
    }

    /**
     * @dev Check if address is a registered doctor
     */
    function isDoctor(address addr) public view returns (bool) {
        return doctors[addr].exists && doctors[addr].approved;
    }

    /**
     * @dev Check if address is a registered patient
     */
    function isPatient(address addr) public view returns (bool) {
        return patients[addr].exists;
    }
}
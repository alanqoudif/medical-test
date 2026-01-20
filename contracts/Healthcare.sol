// SPDX-License-Identifier: MIT
// License identifier - specifies this code uses the MIT open source license
pragma solidity ^0.8.20;
// Solidity version requirement - code must compile with version 0.8.20 or higher

contract Healthcare {
    // Events - these are emitted to notify external applications about contract actions
    event DoctorRegistered(address indexed doctor, string name, string specialty);
    // Event emitted when a new doctor registers - includes doctor address, name, and specialty
    event PatientRegistered(address indexed patient, string name);
    // Event emitted when a new patient registers - includes patient address and name
    event AppointmentBooked(
        uint256 indexed appointmentId,
        address indexed patient,
        address indexed doctor,
        uint64 startTime
    );
    // Event emitted when an appointment is booked - includes appointment ID, patient, doctor, and start time
    event NoteAdded(uint256 indexed appointmentId, address indexed doctor);
    // Event emitted when a doctor adds a medical note to an appointment

    // Enums - custom types that represent a set of named constants
    enum AppointmentStatus {
        Booked,    // Appointment is scheduled but not yet completed
        Completed, // Appointment has been finished
        Cancelled  // Appointment was cancelled
    }

    // Structs - custom data types that group related variables together
    struct Doctor {
        address addr;        // Ethereum address of the doctor
        string name;         // Doctor's full name
        string specialty;   // Medical specialty (e.g., "Cardiology", "Pediatrics")
        string licenseId;   // Medical license identification number
        bool exists;         // Flag to check if doctor is registered
        bool approved;       // Flag to check if doctor is approved to practice
        uint256 createdAt;   // Timestamp when doctor was registered
    }

    struct Patient {
        address addr;        // Ethereum address of the patient
        string name;         // Patient's full name
        uint8 age;           // Patient's age (0-255)
        bool exists;         // Flag to check if patient is registered
        uint256 createdAt;   // Timestamp when patient was registered
    }

    struct Appointment {
        uint256 id;              // Unique appointment identifier
        address patient;         // Address of the patient
        address doctor;          // Address of the doctor
        uint64 startTime;        // Unix timestamp when appointment starts
        string reason;           // Reason for the appointment
        AppointmentStatus status; // Current status (Booked, Completed, Cancelled)
        uint64 createdAt;        // Timestamp when appointment was created
    }

    struct Note {
        bool exists;            // Flag to check if note exists for this appointment
        uint256 appointmentId; // ID of the appointment this note belongs to
        address doctor;        // Address of the doctor who wrote the note
        string diagnosis;      // Medical diagnosis
        string prescription;   // Prescribed medication or treatment
        uint64 createdAt;      // Timestamp when note was created
    }

    // Storage - state variables stored permanently on the blockchain
    mapping(address => Doctor) public doctors;
    // Mapping that stores doctor information by their Ethereum address
    mapping(address => Patient) public patients;
    // Mapping that stores patient information by their Ethereum address
    address[] public doctorAddresses; // Track doctor addresses for counting
    // Array to store all doctor addresses - used for listing and counting doctors
    address[] public patientAddresses; // Track patient addresses for counting
    // Array to store all patient addresses - used for listing and counting patients
    Appointment[] public appointments;
    // Array to store all appointments in the system
    mapping(uint256 => Note) public notes;
    // Mapping that stores medical notes by appointment ID

    uint256 public appointmentCounter;
    // Counter that increments for each new appointment - used to generate unique IDs
    uint256 public totalDoctorsCount;
    // Total number of registered doctors in the system
    uint256 public totalPatientsCount;
    // Total number of registered patients in the system

    // Modifiers - reusable code that can be applied to functions to add checks
    modifier onlyDoctor() {
        // Check if the caller is a registered doctor
        require(doctors[msg.sender].exists, "Not a registered doctor");
        // Verify the doctor is approved to practice
        require(doctors[msg.sender].approved, "Doctor not approved");
        _; // Continue executing the function if checks pass
    }

    modifier onlyPatient() {
        // Check if the caller is a registered patient
        require(patients[msg.sender].exists, "Not a registered patient");
        _; // Continue executing the function if check passes
    }

    modifier requireRegistered() {
        // Check if caller is either a doctor or patient
        require(
            doctors[msg.sender].exists || patients[msg.sender].exists,
            "User not registered"
        );
        _; // Continue executing the function if check passes
    }

    // String length validation (max 120 chars)
    modifier validStringLength(string memory str) {
        // Ensure string is not longer than 120 characters
        require(bytes(str).length <= 120, "String exceeds 120 characters");
        // Ensure string is not empty
        require(bytes(str).length > 0, "String cannot be empty");
        _; // Continue executing the function if checks pass
    }

    // Functions

    /**
     * @dev Register a new doctor (auto-approved, no admin)
     */
    function registerDoctor(
        string memory name,        // Doctor's full name
        string memory specialty,   // Medical specialty field
        string memory licenseId    // Medical license identification
    )
        public                      // Can be called by anyone
        validStringLength(name)     // Validate name length
        validStringLength(specialty) // Validate specialty length
        validStringLength(licenseId) // Validate license ID length
    {
        // Check if doctor is not already registered
        require(!doctors[msg.sender].exists, "Doctor already registered");
        // Prevent someone from being both doctor and patient
        require(!patients[msg.sender].exists, "Cannot be both doctor and patient");

        // Create and store the doctor record
        doctors[msg.sender] = Doctor({
            addr: msg.sender,           // Store the caller's address
            name: name,                 // Store doctor's name
            specialty: specialty,       // Store medical specialty
            licenseId: licenseId,       // Store license ID
            exists: true,               // Mark as registered
            approved: true,             // Auto-approved (no admin needed)
            createdAt: block.timestamp  // Record registration time
        });

        // Add doctor address to the list for easy access
        doctorAddresses.push(msg.sender);
        // Increment total doctor count
        totalDoctorsCount++;

        // Emit event to notify external applications
        emit DoctorRegistered(msg.sender, name, specialty);
    }

    /**
     * @dev Register a new patient
     */
    function registerPatient(
        string memory name,  // Patient's full name
        uint8 age            // Patient's age
    ) public                 // Can be called by anyone
        validStringLength(name) // Validate name length
    {
        // Check if patient is not already registered
        require(!patients[msg.sender].exists, "Patient already registered");
        // Prevent someone from being both patient and doctor
        require(!doctors[msg.sender].exists, "Cannot be both doctor and patient");
        // Validate age is between 1 and 150
        require(age > 0 && age <= 150, "Invalid age");

        // Create and store the patient record
        patients[msg.sender] = Patient({
            addr: msg.sender,          // Store the caller's address
            name: name,                // Store patient's name
            age: age,                  // Store patient's age
            exists: true,              // Mark as registered
            createdAt: block.timestamp  // Record registration time
        });

        // Add patient address to the list for easy access
        patientAddresses.push(msg.sender);
        // Increment total patient count
        totalPatientsCount++;

        // Emit event to notify external applications
        emit PatientRegistered(msg.sender, name);
    }

    /**
     * @dev Get all doctors
     */
    function listDoctors() public view returns (Doctor[] memory) {
        // Create a new array with size equal to number of doctors
        Doctor[] memory doctorList = new Doctor[](doctorAddresses.length);
        // Loop through all doctor addresses
        for (uint256 i = 0; i < doctorAddresses.length; i++) {
            // Get doctor info from mapping and add to array
            doctorList[i] = doctors[doctorAddresses[i]];
        }
        // Return the complete list of doctors
        return doctorList;
    }

    /**
     * @dev Get all patients
     */
    function listPatients() public view returns (Patient[] memory) {
        // Create a new array with size equal to number of patients
        Patient[] memory patientList = new Patient[](patientAddresses.length);
        // Loop through all patient addresses
        for (uint256 i = 0; i < patientAddresses.length; i++) {
            // Get patient info from mapping and add to array
            patientList[i] = patients[patientAddresses[i]];
        }
        // Return the complete list of patients
        return patientList;
    }

    /**
     * @dev Book an appointment (patient only)
     */
    function bookAppointment(
        address doctor,      // Address of the doctor to book with
        uint64 startTime,    // Unix timestamp for appointment start time
        string memory reason // Reason for the appointment
    )
        public              // Can be called by anyone
        onlyPatient         // But only if caller is a registered patient
        validStringLength(reason) // Validate reason string length
        returns (uint256)    // Returns the appointment ID
    {
        // Verify the doctor exists in the system
        require(doctors[doctor].exists, "Doctor does not exist");
        // Verify the doctor is approved to practice
        require(doctors[doctor].approved, "Doctor not approved");
        // Ensure appointment time is in the future
        require(startTime > block.timestamp, "Start time must be in the future");

        // Increment appointment counter to generate unique ID
        appointmentCounter++;
        // Store the new appointment ID
        uint256 appointmentId = appointmentCounter;

        // Create and add the appointment to the array
        appointments.push(
            Appointment({
                id: appointmentId,              // Unique appointment identifier
                patient: msg.sender,            // Address of patient (caller)
                doctor: doctor,                 // Address of selected doctor
                startTime: startTime,           // Scheduled start time
                reason: reason,                 // Appointment reason
                status: AppointmentStatus.Booked, // Set status to Booked
                createdAt: uint64(block.timestamp) // Record creation time
            })
        );

        // Emit event to notify external applications
        emit AppointmentBooked(appointmentId, msg.sender, doctor, startTime);

        // Return the appointment ID to the caller
        return appointmentId;
    }

    /**
     * @dev Doctor can book appointment for a patient
     */
    function bookAppointmentForPatient(
        address patient,     // Address of the patient
        uint64 startTime,     // Unix timestamp for appointment start time
        string memory reason  // Reason for the appointment
    )
        public               // Can be called by anyone
        onlyDoctor           // But only if caller is a registered doctor
        validStringLength(reason) // Validate reason string length
        returns (uint256)     // Returns the appointment ID
    {
        // Verify the patient exists in the system
        require(patients[patient].exists, "Patient does not exist");
        // Ensure appointment time is in the future
        require(startTime > block.timestamp, "Start time must be in the future");

        // Increment appointment counter to generate unique ID
        appointmentCounter++;
        // Store the new appointment ID
        uint256 appointmentId = appointmentCounter;

        // Create and add the appointment to the array
        appointments.push(
            Appointment({
                id: appointmentId,              // Unique appointment identifier
                patient: patient,               // Address of the patient
                doctor: msg.sender,            // Address of doctor (caller)
                startTime: startTime,           // Scheduled start time
                reason: reason,                 // Appointment reason
                status: AppointmentStatus.Booked, // Set status to Booked
                createdAt: uint64(block.timestamp) // Record creation time
            })
        );

        // Emit event to notify external applications
        emit AppointmentBooked(appointmentId, patient, msg.sender, startTime);

        // Return the appointment ID to the caller
        return appointmentId;
    }

    /**
     * @dev Get appointments for the calling patient
     */
    function getMyAppointmentsAsPatient()
        public              // Can be called by anyone
        view                // Read-only function (doesn't modify state)
        onlyPatient         // But only if caller is a registered patient
        returns (Appointment[] memory) // Returns array of appointments
    {
        // Initialize counter for matching appointments
        uint256 count = 0;
        
        // Count matching appointments - first pass to determine array size
        for (uint256 i = 0; i < appointments.length; i++) {
            // Check if this appointment belongs to the caller
            if (appointments[i].patient == msg.sender) {
                // Increment count if it matches
                count++;
            }
        }

        // Build result array with exact size needed
        Appointment[] memory result = new Appointment[](count);
        // Index for filling the result array
        uint256 index = 0;
        
        // Second pass to populate the result array
        for (uint256 i = 0; i < appointments.length; i++) {
            // Check if this appointment belongs to the caller
            if (appointments[i].patient == msg.sender) {
                // Add appointment to result array
                result[index] = appointments[i];
                // Move to next position in result array
                index++;
            }
        }

        // Return the filtered list of appointments
        return result;
    }

    /**
     * @dev Get appointments for the calling doctor
     */
    function getMyAppointmentsAsDoctor()
        public              // Can be called by anyone
        view                // Read-only function (doesn't modify state)
        onlyDoctor          // But only if caller is a registered doctor
        returns (Appointment[] memory) // Returns array of appointments
    {
        // Initialize counter for matching appointments
        uint256 count = 0;
        
        // Count matching appointments - first pass to determine array size
        for (uint256 i = 0; i < appointments.length; i++) {
            // Check if this appointment belongs to the caller
            if (appointments[i].doctor == msg.sender) {
                // Increment count if it matches
                count++;
            }
        }

        // Build result array with exact size needed
        Appointment[] memory result = new Appointment[](count);
        // Index for filling the result array
        uint256 index = 0;
        
        // Second pass to populate the result array
        for (uint256 i = 0; i < appointments.length; i++) {
            // Check if this appointment belongs to the caller
            if (appointments[i].doctor == msg.sender) {
                // Add appointment to result array
                result[index] = appointments[i];
                // Move to next position in result array
                index++;
            }
        }

        // Return the filtered list of appointments
        return result;
    }

    /**
     * @dev Add or update a note for an appointment (doctor only)
     */
    function addOrUpdateNote(
        uint256 appointmentId,      // ID of the appointment
        string memory diagnosis,     // Medical diagnosis
        string memory prescription  // Prescribed treatment or medication
    )
        public                       // Can be called by anyone
        onlyDoctor                   // But only if caller is a registered doctor
        validStringLength(diagnosis) // Validate diagnosis string length
        validStringLength(prescription) // Validate prescription string length
    {
        // Verify appointment ID is valid (greater than 0 and within range)
        require(appointmentId > 0 && appointmentId <= appointmentCounter, "Invalid appointment ID");
        
        // Find the appointment in the array
        bool found = false; // Flag to track if appointment was found
        // Loop through all appointments
        for (uint256 i = 0; i < appointments.length; i++) {
            // Check if this is the appointment we're looking for
            if (appointments[i].id == appointmentId) {
                found = true; // Mark as found
                // Verify the caller is the doctor for this appointment
                require(appointments[i].doctor == msg.sender, "Not your appointment");
                // Only allow notes for booked or completed appointments
                require(
                    appointments[i].status == AppointmentStatus.Booked ||
                    appointments[i].status == AppointmentStatus.Completed,
                    "Cannot add note to cancelled appointment"
                );
                break; // Exit loop once found
            }
        }
        // Ensure appointment was found
        require(found, "Appointment not found");

        // Create or update the note in storage
        notes[appointmentId] = Note({
            exists: true,                    // Mark note as existing
            appointmentId: appointmentId,    // Link to appointment
            doctor: msg.sender,              // Store doctor who wrote the note
            diagnosis: diagnosis,            // Store medical diagnosis
            prescription: prescription,       // Store prescription
            createdAt: uint64(block.timestamp) // Record creation time
        });

        // Emit event to notify external applications
        emit NoteAdded(appointmentId, msg.sender);
    }

    /**
     * @dev Get a note for an appointment
     */
    function getNote(uint256 appointmentId)
        public              // Can be called by anyone
        view                // Read-only function (doesn't modify state)
        returns (Note memory) // Returns the note structure
    {
        // Return the note associated with this appointment ID
        return notes[appointmentId];
    }

    /**
     * @dev Get statistics
     */
    function stats()
        public              // Can be called by anyone
        view                // Read-only function (doesn't modify state)
        returns (uint256 totalDoctors, uint256 totalPatients, uint256 totalAppointments)
        // Returns three values: total doctors, total patients, total appointments
    {
        // Return total number of registered doctors
        totalDoctors = totalDoctorsCount;
        // Return total number of registered patients
        totalPatients = totalPatientsCount;
        // Return total number of appointments (length of appointments array)
        totalAppointments = appointments.length;
    }

    /**
     * @dev Get total number of appointments
     */
    function getTotalAppointments() public view returns (uint256) {
        // Return the length of the appointments array
        return appointments.length;
    }

    /**
     * @dev Get all appointments (for doctor/admin view)
     */
    function getAllAppointments() public view returns (Appointment[] memory) {
        // Return the entire appointments array
        return appointments;
    }

    /**
     * @dev Check if address is a registered doctor
     */
    function isDoctor(address addr) public view returns (bool) {
        // Return true if address exists as doctor AND is approved
        return doctors[addr].exists && doctors[addr].approved;
    }

    /**
     * @dev Check if address is a registered patient
     */
    function isPatient(address addr) public view returns (bool) {
        // Return true if address exists as patient
        return patients[addr].exists;
    }
}
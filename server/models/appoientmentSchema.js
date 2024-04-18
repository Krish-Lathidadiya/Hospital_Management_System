const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    nic: {
        type: String,
        required: true,
    },
    dob: {
        type: String, 
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    appointment_date: {
        type: Date, 
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    doctor: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        }
    },
    hasVisited: {
        type: Boolean, 
        required: true,
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId, 
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'], 
        default: 'Pending',
    }
});

const Appointment = mongoose.model('Appointment', appointmentSchema); 
module.exports = Appointment;

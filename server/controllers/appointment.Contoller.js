const Appointment = require('../models/appoientmentSchema')
const User = require('../models/userSchema');

const postAppointments = async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date,
        department,
        doctor_firstName,
        doctor_lastName,
        hasVisited,
        address,
    } = req.body;
   


    // Check if all required fields are present
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'nic', 'dob', 'gender', 'appointment_date', 'department', 'doctor_firstName', 'doctor_lastName', 'hasVisited', 'address'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
        const customError = {
            status: 400,
            message: `Please fill all details. Missing fields: ${missingFields.join(', ')}`
        };
        return next(customError);
    }

    try {
        const doctorExist = await User.findOne({
            firstName: doctor_firstName,
            lastName: doctor_lastName,
            role: "doctor",
            doctorDepartment: department,
        });

        if (!doctorExist) {
            const customError = {
                status: 400,
                message: "Doctor not found!"
            };
            return next(customError);
        }

        const doctorId = doctorExist._id
        const patientId = req.user._id
        console.log(doctorId);
        console.log(patientId);


        const newAppointment = await Appointment.create({
            firstName,
            lastName,
            email,
            phone,
            nic,
            dob,
            gender,
            appointment_date,
            department,
            doctor: {
                firstName: doctor_firstName,
                lastName: doctor_lastName,
                _id: doctorId, // Assuming doctorId is a field in your appointment schema
            },
            doctorId,
            patientId,
            hasVisited,
            address,
        });

        if (newAppointment) {
            return res.status(200).json({ message: "Appointment sent successfully" });
        }
        await newAppointment.save(); 
    } catch (error) {
        console.error("Error in postAppointments:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const getAllAppoientments=async(req,res,next) => {
    try {
        const appointments=await Appointment.find();
        res.status(200).json({message:"appointments get successfully",appointments:appointments})
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

const updateAppointment=async(req,res,next) => {
    try {
        const {id}=req.params
        let appointment=await Appointment.findById(id)
        if(!appointment){
            const customError={
                status:400,
                message:"appointment not found"
            }
            next(customError)
        }
    
        const update=await Appointment.findByIdAndUpdate(id,req.body)
        if(update){
            return res.status(200).json({message:"updated successfully",updateAppointment:update})
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
  
}

const deleteAppointment = async (req, res, next) => {
    try {
        const { id } = req.params;
        let appointment = await Appointment.findById(id);
        if (!appointment) {
            const customError = {
                status: 400,
                message: "Appointment not found"
            };
            return next(customError); 
        }

        await appointment.deleteOne();
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

const countAppointment= async (req, res) => {
    try {
      const totalAppointment = await Appointment.countDocuments();
      res.status(200).json({ totalAppointment });
    } catch (error) {
      console.error("Error counting appointment:", error);
      res.status(500).json({ error: "Error counting appointment" });
    }
  };

module.exports = { postAppointments,getAllAppoientments ,updateAppointment,deleteAppointment,countAppointment};

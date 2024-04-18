const bcrypt=require('bcrypt');
const jwtToken=require('../utils/jwtToken.js')
const User = require('../models/userSchema.js'); 
const cloudinary =require('cloudinary')



const userRegister = async (req, res, next) => {
    try {
        const { firstName, lastName, email, phone, nic, dob, gender, password, role } = req.body;
        if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password || !role) {
            const customError = {
                status: 400,
                message: "Please provide full details"
            };
            return next(customError);
        }

        console.log(req.body);

        // Check if the user already exists
        const existedUser = await User.findOne({ email: email });
        if (existedUser) {
            const customError = {
                status: 400,
                message: "User already registered"
            };
            return next(customError);
        }

        // Create a new user
        const newUser = await User.create({ firstName, lastName, email, phone, nic, dob, gender, password, role });
        console.log('new', newUser);
        if (newUser) {
            jwtToken(newUser, "User registered successfully!", 200, res);
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};


const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if(!email || !password || !role) {
            const customError = {
                status: 400,
                message:  "please provide full details"
            };
             return next(customError);
        } 

        // Check if user exists
        const userExist = await User.findOne({ email: email });
        if (!userExist) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, userExist.password);
        if (isPasswordValid) {
            jwtToken(userExist,"user login successfully!",200,res)
        } else {
            return res.status(400).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
const addNewAdmin = async (req, res, next) => {
    const { firstName, lastName, email, phone, nic, dob, gender, password } = req.body;
    
    try {
        if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password) {
            const customError = {
                status: 400,
                message: "Please enter full details"
            };
            throw customError; // Throw the error to catch block
        }
        
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            const customError = {
                status: 400,
                message: `The email ${email} is already registered`
            };
            throw customError; // Throw the error to catch block
        }

        const admin = await User.create({ firstName, lastName, email, phone, nic, dob, gender, password, role: 'admin' });
        if (admin) {
            return res.status(200).json({ message: "Admin registered successfully" });
        }
    } catch (error) {
        next(error); // Pass the error to Express error handler
    }
};


const getAllDoctors=async(req,res,next)=>{
    try {
        const doctor=await User.find({role:'doctor'})
        if(doctor){
            res.status(200).json({message:"Doctor get successfully",doctor})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const countDoctors = async (req, res) => {
    try {
      const totalDoctors = await User.countDocuments({ role: "doctor" });
      res.status(200).json({ totalDoctors });
    } catch (error) {
      console.error("Error counting doctors:", error);
      res.status(500).json({ error: "Error counting doctors" });
    }
  };
  

const getUserDetails=async(req,res,next)=>{
    try {
       const user=req.user;
       res.status(200).json({success:true,user}) 
    } catch (error) {
        res.status(500).json(error)
    }
}

// const logoutAdmin=async(req,res,next)=>{
//     try {
//         res
//         .status(200)
//         .cookie("adminToken","",{
//             expires:new Date(Date.now()),
//             httpOnly:true
//         })
//         .json({
//             message: "Admin logout successfully"
//         })
//     } catch (error) {
//         res.status(500).json(error)
//     }
   
// }

// const logoutPatient=async(req,res,next)=>{
//     try {
//         res
//         .status(200)
//         .cookie("patientToken","",{
//             expires:new Date(Date.now()),
//             httpOnly:true
//         })
//         .json({
//             message: "Patient logout successfully"
//         })
//     } catch (error) {
//         res.status(500).json(error)
//     }
   
// }

const addNewDoctor = async (req, res, next) => {
    try {
        // Tackle req file
        // const docAvatar =req.param.docAvatar
        
        // check file empty
        if (!req.files || Object.keys(req.files).length == 0) {
            const currentError = {
                status: 400,
                message: "Doctor avatar required"
            };
            return next(currentError);
        }
        //file name and format
        const { docAvatar } = req.files;
        const allowedFormats = ['image/jpeg', 'image/png', 'image/webp'];
        if ( !allowedFormats.includes(docAvatar.mimetype)) {
            const currentError = {
                status: 400,
                message: "File format not allowed"
            };
            return next(currentError);
        }

        // Add doctor
        const { firstName, lastName, email, phone, nic, dob, gender, password, doctorDepartment } = req.body;
        if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password || !doctorDepartment) {
            const currentError = {
                status: 400,
                message: "Please fill all details"
            };
            return next(currentError);
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            const currentError = {
                status: 400,
                message: "Doctor already exists"
            };
            return next(currentError);
        }

        //file store to cloudinary using uploader.upload mthod
        const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.log("Cloudinary error:", cloudinaryResponse.error);
            const currentError = {
                status: 500,
                message: "Error uploading avatar"
            };
            return next(currentError);
        }
        console.log(cloudinaryResponse);
        
        const doctor = await User.create({
            firstName, lastName, email, phone, nic, dob, gender, password, doctorDepartment, role: 'doctor',
            docAvatar: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url
            }
        });
        if (doctor) {
            return res.status(200).json({ message: "Doctor registered successfully" ,doctor});
        }
    } catch (error) {
        console.error("Error in addNewDoctor:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports={userRegister,login,addNewAdmin,getAllDoctors,countDoctors,getUserDetails,addNewDoctor}

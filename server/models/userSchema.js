const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    doctorDepartment: {
        type: String,
    },
    docAvatar: {
        public_id: String,
        url: String,
    }
});

//any error code run{}
userSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) {
            return next(); // Move to the next middleware or the save operation
        }
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const hashPassword = await bcrypt.hash(this.password, salt);
        this.password = hashPassword;

        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.generateToken = async function() {
    try {
        return await jwt.sign({
            userId: this._id.toString(),
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.JWT_EXPIRATION
        });
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error("Token generation failed");
    }
};

const User = mongoose.model('User', userSchema);
module.exports = User;

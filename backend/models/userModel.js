const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxlength: [30, 'Your name cannot exced 30 character']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [8, 'Your password must be 8 character long'],
        select: false
    },
    // avatar:{
    //     public_id: {
    //         type: String,
    //         required: true
    //     },
    //     url:{
    //         type: String,
    //         required: true
    //     }
    // },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    address: {
        type: {
            name: {
                type: String
            },
            house: {
                type: String
            },
            city: {
                type: String
            },
            state: {
                type: String
            },
            country: {
                type: String
            },
            pin: {
                type: String
            },
            mobileNo: {
                type: String,
                min: [10, 'Mobile Number must be 10 characters'],
                max: [10, 'Mobile Number must be 10 characters']
            }
        }
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

//Encrypting password before saving user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

//Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Return JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

//Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
    //Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    //Hash and set to resetPasswodToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    //Set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

    return resetToken;
}

module.exports = mongoose.model('User', userSchema);
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter the name"]
    },
    email: {
        type: String,
        required: [true, "Please Enter the email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please Enter the password"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
export default UserModel;
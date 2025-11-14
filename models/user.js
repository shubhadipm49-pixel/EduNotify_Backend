import mongoose from "mongoose";
const Schema = mongoose.Schema;


const userSchema = new Schema({
    rollNumber: String,
    Class: String,
    email: String,
    password: String,
    confirmPassword: String,
});

const userModel = mongoose.model('users', userSchema)
export default userModel;

import mongoose from "mongoose";
const Schema = mongoose.Schema;


const teachSchema = new Schema({
    teachId: String,
    email: String,
    password: String,
    confirmPassword: String,
});

const teachModel = mongoose.model('teachers', teachSchema)
export default teachModel;

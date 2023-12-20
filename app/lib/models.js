import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    surname:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required:true,
    },
    password:{
        type: String,
        required: true,
    },
    isManager: {
        type: String,
        default: false,
    },
    status: {
        type: String,
        default: false,
    },
    manager: {
        type: String,
    },
    isAdmin: {
        type: String,
    },
}, {timestamps:true} 
)


const departmentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    manager: {
        type: String,
    },
}, {timestamps:true} 
)

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Department = mongoose.models.Department || mongoose.model("Department", departmentSchema);
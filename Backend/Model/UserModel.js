const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    empID:{
        type:Number,//dataType
        required:true,//validate
    },
    empName:{
        type:String,//dataType
        required:true,//validate
    },
    depName:{
        type:String,//dataType
        required:true,//validate
    },
    leaveType:{
        type:String,//dataType
        required:true,//validate
    },
    reason:{
        type:String,//dataType
        required:true,//validate
    },
    startDate:{
        type:Date,//dataType
        required:true,//validate
    },
    endDate:{
        type:Date,//dataType
        required:true,//validate
    },
    status:{
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'], 
        default: 'Pending',
    },
    action:{
        type: String,
        default: "Waiting for approval",
    },
    leaveBalance: {
        type: Number,
        default: 20, // Default leave balance, this could be adjusted as needed
    },
    role: {
        type: String,
        default: "Employee", // For example, could be "Manager", "HR", etc.
    },
});

module.exports = mongoose.model(
    "UserModel",//file name
    userSchema //function name
)
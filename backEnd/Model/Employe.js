const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    f_Image: Object,
    f_Name: { type: String, required: true },
    f_Email: { type: String, required: true },
    f_Mobile: String,
    f_Designation: String,
    f_gender: String,
    f_Course: Array,
  },
  {
    timestamps: true,
  }
);

const EmployeeModel = mongoose.model("t_Employee", employeeSchema);

module.exports = EmployeeModel;

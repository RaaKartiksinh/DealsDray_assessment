const { default: mongoose } = require("mongoose");
const EmployeeModel = require("../Model/Employe");
const FileUpload = require("../common/fileController");

class EmployeController {
  async create(req, res) {
    try {
      const { f_Name, f_Email } = req.body;

      let fileDetails;
      if (req.files && req.files.f_Image) {
        const File = req.files.f_Image;
        fileDetails = FileUpload(File);
      }

      // Server-side validation
      if (!f_Name || !f_Email) {
        return res.status(400).send({ message: "Name and Email are required" });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(f_Email)) {
        return res.status(400).send({ message: "Invalid Email format" });
      }

      let fullPath = process.env.backEndUrl + fileDetails.fullPath;
      // return
      const employeeData = { ...req.body, f_Image: fullPath };
      const employee = await EmployeeModel.create(employeeData);
      res.status(201).send(employee);
    } catch (error) {
      console.error("Error creating employee:", error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }

  // Get a specific All employee
  async getAll(req, res) {
    try {
      const employe = await EmployeeModel.find({});
      if (!employe) {
        return res.status(404).send({ message: "Employe not found" });
      }
      res.status(200).send(employe);
    } catch (error) {
      console.error("Error fetching employe:", error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }

  // Get a specific employee by ID
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const objectId = new mongoose.Types.ObjectId(id);
      const employe = await EmployeeModel.findOne({ _id: objectId });
      if (!employe) {
        return res.status(404).send({ message: "Employee not found" });
      }

      return res.status(200).send(employe);
    } catch (error) {
      console.error("Error fetching employee:", error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }

  // Update an employe by ID
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;

      let fileDetails;
      if (req.files && req.files.f_Image) {
        const File = req.files.f_Image;
        fileDetails = FileUpload(File);

        if (fileDetails && fileDetails.fullPath) {
          const fullPath = `${process.env.backEndUrl}${fileDetails.fullPath}`;
          data.f_Image = fullPath;
        } else {
          return res.status(400).send({ message: "File upload failed" });
        }
      }

      const result = await EmployeeModel.findOneAndUpdate({ _id: id }, data, {
        new: true,
      });

      if (!result) {
        return res
          .status(404)
          .send({ message: "Employee not found or data unchanged" });
      }

      res.status(200).send({
        message: "Employee updated successfully",
        updatedEmployee: result,
      });
    } catch (error) {
      console.error("Error updating employee:", error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }

  // Delete an employe by ID
  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await EmployeeModel.findOneAndDelete({ _id: id });
      if (result.deletedCount === 0) {
        return res.status(404).send({ message: "Employe not found" });
      }
      res.status(200).send({
        message: "Employe deleted successfully",
        EmployeDelete: result,
      });
    } catch (error) {
      console.error("Error deleting employe:", error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }
}
const employeController = new EmployeController();
module.exports = employeController;

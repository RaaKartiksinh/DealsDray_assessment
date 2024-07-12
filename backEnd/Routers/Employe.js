const express = require("express");
const employeController = require("../Controller/Employe");
const EmployeRouter = express.Router();

EmployeRouter.post("/", employeController.create)
  .get("/", employeController.getAll)
  .get("/:id", employeController.getOne)
  .put("/:id", employeController.update)
  .delete("/:id", employeController.delete);

module.exports = EmployeRouter;

const employeeController = require("../controllers/employeeController");
const express = require("express");
const router = express.Router();

router.get("/", employeeController.getAllEmployee);
router.post("/", employeeController.createEmployee);
router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);
router.get("/search", employeeController.searchEmployees);
router.get("/:id", employeeController.getEmployeeById);

module.exports = router;

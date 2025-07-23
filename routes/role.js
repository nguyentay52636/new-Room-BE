const express = require("express");
const router = express.Router();
const roleController = require("../controllers/RoleController");

// GET /api/viewings
router.get("/", roleController.getAllRoles);

module.exports = router;

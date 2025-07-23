// server/routes/property.js
const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/propertyController");

// GET /api/properties
router.get("/", propertyController.getAllProperty);
// GET /api/properties/:district
router.get("/:district", propertyController.getPropertiesByDistrict);

// GET /api/properties/:id
router.get("/:id", propertyController.getPropertyById);

// POST /api/properties
router.post("/", propertyController.createProperty);

// PUT /api/properties/:id
router.put("/:id", propertyController.updateProperty);

// DELETE /api/properties/:id
router.delete("/:id", propertyController.deleteProperty);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getOwners,
  getOwnerById,
  createOwner,
  updateOwner,
  deleteOwner,
} = require("../controllers/ownerController");

router.get("/", getOwners);
router.get("/:id", getOwnerById);
router.post("/", createOwner);
router.put("/:id", updateOwner);
router.delete("/:id", deleteOwner);

module.exports = router;

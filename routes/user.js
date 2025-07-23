const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const middlewareController = require("../controllers/middlewareController");

// GET /api/user - Get all users
router.get("/", userController.getAllUser);

// GET /api/user/:id - Get user by ID
router.get("/:id", userController.getUserById);

// POST /api/user - Create new user
router.post("/", userController.createUser);

// PUT /api/user/:id - Update user
router.put("/:id", userController.updateUser);

// DELETE /api/user/:id (admin or self)
router.delete(
  "/:id",
  middlewareController.verifyTokenAndAdminAuth,
  userController.deleteUser
);

module.exports = router;

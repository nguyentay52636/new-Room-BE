const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favoriteController");


// GET /api/favorites/user/:userId
router.get(
  "/user/:userId",
  favoriteController.getFavoritesByUser
);
router.get("/", favoriteController.getAllFavorites);
// POST /api/favorites
router.post("/", favoriteController.createFavorite);

// DELETE /api/favorites
router.delete("/", favoriteController.deleteFavorite);

module.exports = router;

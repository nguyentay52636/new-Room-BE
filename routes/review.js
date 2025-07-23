const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");


// GET /api/reviews
router.get("/", reviewController.getAllReviews);

// GET /api/reviews/property/:propertyId/stats (phải đặt trước /:id để tránh conflict)
router.get(
  "/property/:propertyId/stats", reviewController.getRatingStatsByProperty);

// GET /api/reviews/property/:propertyId
router.get(
  "/property/:propertyId",reviewController.getReviewsByProperty);

// GET /api/reviews/user/:userId
router.get(
  "/user/:userId",reviewController.getReviewsByUser);

// GET /api/reviews/:id
router.get("/:id",reviewController.getReviewById);

// POST /api/reviews
router.post("/", reviewController.createReview); 

// PUT /api/reviews/:id
router.put("/:id", reviewController.updateReview); 

// DELETE /api/reviews/:id
router.delete("/:id", reviewController.deleteReview); 

module.exports = router;

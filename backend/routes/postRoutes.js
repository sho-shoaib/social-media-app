const express = require("express");
const {
  getAllPosts,
  createPost,
  getPostById,
  deletePostById,
} = require("../controllers/postControllers.js");
const authController = require("../controllers/authController.js");

const router = express.Router();

router.route("/").get(getAllPosts).post(authController.protect, createPost);
router
  .route("/:id")
  .get(getPostById)
  .delete(authController.restrictTo("admin"), deletePostById);

module.exports = router;

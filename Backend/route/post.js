const express = require("express");
const router = express.Router();
const postController = require("../controller/post");
const middlewareController = require("../controller/middleware");

// Create a new post
router.post(
  "/post/create",
  middlewareController.verifyToken,
  postController.createPost
);

// Get all posts
router.get("/post/getPost", postController.getAllPosts);

// Get a post by ID
router.get("/post/get/:id", postController.getPostById);

// Update a post
router.put(
  "/post/update/:id",
  middlewareController.verifyToken,
  postController.updatePost
);

// Delete a post
router.delete(
  "/post/delete/:id",
  middlewareController.verifyToken,
  postController.deletePost
);

module.exports = router;

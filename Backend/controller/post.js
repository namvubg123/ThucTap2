const Post = require("../model/post");

const postController = {
  createPost: async (req, res) => {
    try {
      const {
        title,
        description,
        price,
        address,
        area,
        gara,
        featured,
        owner,
        images,
        bedrooms,
        bathrooms,
        type,
        phone,
        locationX,
        locationY,
        city,
      } = req.body;

      const post = new Post({
        title: title,
        description: description,
        price: price,
        address: address,
        area: area,
        featured: featured,
        owner: owner,
        images: images,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        type: type,
        gara: gara,
        locationX: locationX,
        locationY: locationY,
        phone: phone,
        city: city,
      });

      post.save((error, post) => {
        if (error) return res.status(400).json({ error });
        if (post) {
          res.status(201).json({ post, files: req.files });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllPosts: async (req, res) => {
    try {
      const owner = req.query.user;
      let posts;
      if (owner) {
        posts = await Post.find({ owner });
      } else {
        posts = await Post.find();
      }

      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getPostById: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updatePost: async (req, res) => {
    try {
      const postId = req.params.id;
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $set: req.body },
        {
          new: true,
        }
      );

      if (!updatedPost) {
        return res.status(404).json({ error: "Post not found" });
      }

      res.status(200).json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deletePost: async (req, res) => {
    try {
      const postId = req.params.id;
      const deletedPost = await Post.findByIdAndDelete(postId);

      if (!deletedPost) {
        return res.status(404).json({ error: "Post not found" });
      }

      res.status(204).send(); // No content response for successful deletion
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = postController;

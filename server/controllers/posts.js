const { User } = require("../models/user");
const { Post } = require("../models/post");

module.exports = {
  getAllPosts: (req, res) => {
    console.log("getAllPosts");
  },
  getCurrentUserPosts: (req, res) => {
    console.log("getAllPosts");
  },
  addPost: async (req, res) => {
    try {
      const { title, content, status, userId } = req.body;

      await Post.create({ title, content, privateStatus: status, userId });
      res.sendStatus(200);
    } catch (error) {
      console.log("error in add post", error);
      res.sendStatus(400);
    }
  },
  editPost: (req, res) => {
    console.log("editPost");
  },
  deletePost: (req, res) => {
    console.log("deletePost");
  },
};

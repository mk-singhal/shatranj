const express = require("express");
const router = express.Router();
const createBlogController = require("../controllers/blog/createBlog.controller");
const editBlogController = require("../controllers/blog/editBlog.controller");
const deleteBlogController = require("../controllers/blog/deleteBlog.controller");

router.post("/create", createBlogController.createBlog);
// router.put("/edit", editBlogController.editBlog);
// router.delete("/edit", deleteBlogController.deleteBlog);

module.exports = router;

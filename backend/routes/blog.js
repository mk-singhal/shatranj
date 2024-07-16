const express = require("express");
const router = express.Router();
const createBlogController = require("../controllers/blog/createBlog.controller");
const createBlogViewController = require("../controllers/blogView/createBlogView.controller");
// const editBlogController = require("../controllers/blog/editBlog.controller");
// const deleteBlogController = require("../controllers/blog/deleteBlog.controller");

router.post("/create", createBlogController.createBlog);
router.post("/view/add", createBlogViewController.createBlogView);
// router.put("/edit", editBlogController.editBlog);
// router.delete("/edit", deleteBlogController.deleteBlog);

module.exports = router;

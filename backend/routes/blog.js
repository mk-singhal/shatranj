const express = require("express");
const router = express.Router();
const getBlogController = require("../controllers/blog/getBlog.controller")
const createBlogController = require("../controllers/blog/createBlog.controller");
const createBlogViewController = require("../controllers/blogReaction/createBlogView.controller");
const createBlogLikeController = require("../controllers/blogReaction/createBlogLike.controller");
const removeBlogLikeController = require("../controllers/blogReaction/removeBlogLike.controller");
const editBlogController = require("../controllers/blog/editBlog.controller");
// const deleteBlogController = require("../controllers/blog/deleteBlog.controller");

router.post("/create", createBlogController.createBlog);
router.put("/edit/:slug", editBlogController.editBlog);
router.get("/edit-get/:slug", getBlogController.getBlogDetailForEdit);
router.post("/view/add", createBlogViewController.createBlogView);
router.post("/like/add", createBlogLikeController.createBlogLike);
router.post("/like/remove", removeBlogLikeController.removeBlogLike);
// router.delete("/edit", deleteBlogController.deleteBlog);

module.exports = router;

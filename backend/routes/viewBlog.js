const express = require("express");
const router = express.Router();
const getBlogController = require("../controllers/blog/getBlog.controller")

router.get("/", getBlogController.getBlog);
router.get("/:slug", getBlogController.getBlogDetail);
router.get("/tag/:tag", getBlogController.getTagBlog);
router.get("/user/:username", getBlogController.getUserBlog);
// router.get("/:id/view/add", getBlogController.addBlogView);

module.exports = router;

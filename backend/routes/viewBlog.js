const express = require("express");
const router = express.Router();
const getBlogController = require("../controllers/blog/getBlog.controller")

router.get("/", getBlogController.getBlog);
router.get("/:slug", getBlogController.getBlogDetail);
// router.get("/:id/view/add", getBlogController.addBlogView);

module.exports = router;

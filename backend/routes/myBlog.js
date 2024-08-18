const express = require("express");
const router = express.Router();
const getBlogController = require("../controllers/blog/getBlog.controller")

router.get("/", getBlogController.getMyBlog);

module.exports = router;

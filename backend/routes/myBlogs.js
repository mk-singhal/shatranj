const express = require("express");
const router = express.Router();
const myBlogsController = require("../controllers/blog/myBlog.controller");

router.get("/", myBlogsController.getBlogs);

module.exports = router;

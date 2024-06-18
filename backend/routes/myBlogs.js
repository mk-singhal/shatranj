const express = require("express");
const router = express.Router();
const myBlogsController = require("../controllers/blogs/myBlogs.controller");

router.get("/", myBlogsController.getBlogs);

module.exports = router;

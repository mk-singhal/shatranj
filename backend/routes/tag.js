const express = require("express");
const router = express.Router();
const createTagController = require("../controllers/tag/createTag.controller");

router.post("/create", createTagController.handleNewTag);

module.exports = router;

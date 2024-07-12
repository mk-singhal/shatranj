const express = require("express");
const router = express.Router();
const getTagController = require("../controllers/tag/getTag.controller");
const createTagController = require("../controllers/tag/createTag.controller");

router.get("/", getTagController.handleTag);
router.post("/create", createTagController.handleNewTag);

module.exports = router;

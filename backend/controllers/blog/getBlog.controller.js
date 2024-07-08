const Blog = require("../../model/Blog");

const getBlogs = async (req, res) => {
  return res.json({
    message: "Hello"
  });
};

module.exports = { getBlogs };

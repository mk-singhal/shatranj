const User = require("../../model/User");

const getBlogs = async (req, res) => {
  return res.json({
    message: "Hello"
  });
};

module.exports = { getBlogs };

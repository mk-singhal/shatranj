const Blog = require("../../model/Blog");

const getBlogs = async (req, res) => {
  const { image, header, tag, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and password are required." });

};

module.exports = { getBlogs };

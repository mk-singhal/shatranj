const { User, Blog, Reaction } = require("../../model/index");

const createBlogView = async (req, res) => {
  const author = req.user;
  const foundUser = await User.findOne({ where: { email: author } });
  if (!foundUser) return res.status(403).json({ message: "User not found" }); //Forbidden
  try {
    const blog = await Blog.findByPk(req.body.blogId);
    console.log("Comparing IDs: ", blog.userId, foundUser.id);
    if (foundUser && blog) {
      if (foundUser.id === blog.userId) return res.sendStatus(405);
      const [reaction, created] = await Reaction.findOrCreate({
        where: {
          userId: foundUser.id,
          blogId: blog.id,
        },
        defaults: {
          userId: foundUser.id,
          blogId: blog.id,
          view: true,
        },
      });
      if (created) {
        return res
          .status(202)
          .json({ message: "View already exists", liked: reaction.like });
      }
      return res
        .status(201)
        .json({ message: "View created", liked: reaction.like });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createBlogView };

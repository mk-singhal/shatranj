const { User, Blog, Reaction } = require("../../model/index");

const removeBlogLike = async (req, res) => {
  const author = req.user;
  const foundUser = await User.findOne({ where: { email: author } });
  if (!foundUser) return res.status(403).json({ message: "User not found" }); //Forbidden
  try {
    const blog = await Blog.findByPk(req.body.blogId);
    console.log("Comparing IDs: ", blog.userId, foundUser.id);
    if (foundUser && blog) {
      if (foundUser.id === blog.userId) return res.sendStatus(405);
      const foundReaction = await Reaction.findOne({
        where: {
          userId: foundUser.id,
          blogId: blog.id,
        },
      });
      if (foundReaction === null) {
        const reaction = await Reaction.create({
          userId: foundUser.id,
          blogId: blog.id,
          like: false,
          view: true,
        });
        return res
          .status(201)
          .json({ message: "Unlike", liked: reaction.like });
      } else {
        const updatedReaction = await Reaction.update(
          { like: false },
          {
            where: {
              userId: foundUser.id,
              blogId: blog.id,
            },
          }
        );
        console.log("Updates like status: ", updatedReaction.like);
        return res.status(200).json({ message: "Like updated", liked: false });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { removeBlogLike };

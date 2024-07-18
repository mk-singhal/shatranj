const { sq } = require("../../config/dbConn");
const { User, Blog, Tag, Reaction } = require("../../model/index");

const getBlog = async (req, res) => {
  try {
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const blogs = await Blog.findAll({
      order: [["createdAt", "DESC"]],
      offset,
      limit,
      attributes: {
        // count total likes & views for each blog
        include: [
          [
            sq.literal(
              '(SELECT COUNT(view) FROM reactions WHERE "blogId" = blog.id AND reactions.view = true)'
            ),
            "views",
          ],
          [
            sq.literal(
              '(SELECT COUNT("like") FROM reactions WHERE "blogId" = blog.id AND reactions.like = true)'
            ),
            "likes",
          ],
        ],
      },
      include: [
        {
          model: Tag,
          as: "tag",
          attributes: ["id", "name"],
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "firstName", "lastName", "email"],
        },
      ],
    });
    if (!blogs) {
      return res.status(204).json({ message: "No Blogs found!" });
    }
    res.status(200).json({ blogs: blogs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getBlogDetail = async (req, res) => {
  console.log("Get Blog Details");
  try {
    const blog = await Blog.findOne({
      where: { slug: req.params.slug },
      attributes: ["id", "slug", "image", "title", "content", "createdAt"],
      include: [
        {
          model: Tag,
          as: "tag",
          attributes: ["id", "name"],
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "firstName", "lastName", "email"],
        },
      ],
    });
    // console.log(blog);
    if (!blog) {
      return res.status(204).json({ message: "No Blog found!" });
    }
    const viewCount = await Reaction.count({
      where: {
        blogId: blog.id,
        view: true,
      },
    });
    const likeCount = await Reaction.count({
      where: {
        blogId: blog.id,
        like: true,
      },
    });

    res
      .status(200)
      .json({ blog: blog, viewCount: viewCount, likeCount: likeCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getBlog, getBlogDetail };

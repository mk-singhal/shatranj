const { User, Blog, Tag } = require("../../model/index");

const getBlog = async (req, res) => {
  try {
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const blogs = await Blog.findAll({
      order: [["createdAt", "DESC"]],
      offset,
      limit,
      include: [
        {
          model: Tag,
          as: 'tag',
          attributes: ['id', 'name'],       
        }, {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'email'],
        }
      ],
    });
    // console.log(blogs);
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
      where: { slug: req.params.slug},
      attributes: ['id', 'slug', 'image', 'title', 'content', 'createdAt'],       
      include: [
        {
          model: Tag,
          as: 'tag',
          attributes: ['id', 'name'],       
        }, {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'email'],
        }
      ],
    });
    // console.log(blog);
    if (!blog) {
      return res.status(204).json({ message: "No Blog found!" });
    }

    res.status(200).json({ blog: blog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getBlog, getBlogDetail };

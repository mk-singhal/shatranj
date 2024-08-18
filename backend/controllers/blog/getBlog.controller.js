const { sq } = require("../../config/dbConn");
const { Op } = require("sequelize");
const { User, Blog, Tag, Reaction } = require("../../model/index");

const getBlog = async (req, res) => {
  try {
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const searchString = req.query.search;
    const sort = req.query.sort;

    const attributes = {
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
            '(SELECT COUNT("like") FROM reactions WHERE "blogId" = blog.id AND reactions."like" = true)'
          ),
          "likes",
        ],
      ],
    };
    const include = [
      {
        model: Tag,
        as: "tag",
        attributes: ["id", "name"],
      },
      {
        model: User,
        as: "user",
        attributes: ["id", "username", "firstName", "lastName"],
      },
    ];
    const blogOptions = {
      offset,
      limit,
      attributes,
      include,
    };
    // console.log(searchString, sort);
    if (searchString != "" && sort != "" && sort === "likes") {
      blogOptions.where = {
        [Op.or]: [
          { title: { [Op.iLike]: `%${searchString}%` } },
          { content: { [Op.iLike]: `%${searchString}%` } },
          { "$tag.name$": { [Op.iLike]: `%${searchString}%` } },
        ],
      };
      blogOptions.order = [
        ["likes", "DESC"],
        ["createdAt", "DESC"],
      ];
    } else if (searchString != "" && sort != "" && sort === "views") {
      blogOptions.where = {
        [Op.or]: [
          { title: { [Op.iLike]: `%${searchString}%` } },
          { content: { [Op.iLike]: `%${searchString}%` } },
          { "$tag.name$": { [Op.iLike]: `%${searchString}%` } },
        ],
      };
      blogOptions.ordder = [
        ["views", "DESC"],
        ["createdAt", "DESC"],
      ];
    } else if (searchString != "") {
      blogOptions.where = {
        [Op.or]: [
          { title: { [Op.iLike]: `%${searchString}%` } },
          { content: { [Op.iLike]: `%${searchString}%` } },
          { "$tag.name$": { [Op.iLike]: `%${searchString}%` } },
        ],
      };
      blogOptions.order = [["createdAt", "DESC"]];
    } else if (sort != "" && sort === "likes") {
      blogOptions.order = [
        ["likes", "DESC"],
        ["createdAt", "DESC"],
      ];
    } else if (sort != "" && sort === "views") {
      blogOptions.order = [
        ["views", "DESC"],
        ["createdAt", "DESC"],
      ];
    } else {
      blogOptions.order = [["createdAt", "DESC"]];
    }
    const blogs = await Blog.findAll(blogOptions);
    if (!blogs) {
      return res.status(204).json({ message: "No Blogs found!" });
    }
    res.status(200).json({ blogs: blogs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getMyBlog = async (req, res) => {
  try {
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const searchString = req.query.search;
    const sort = req.query.sort;

    const attributes = {
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
            '(SELECT COUNT("like") FROM reactions WHERE "blogId" = blog.id AND reactions."like" = true)'
          ),
          "likes",
        ],
      ],
    };
    const include = [
      {
        model: Tag,
        as: "tag",
        attributes: ["id", "name"],
      },
      {
        model: User,
        as: "user",
        attributes: ["id", "username", "firstName", "lastName"],
      },
    ];
    const blogOptions = {
      offset,
      limit,
      attributes,
      include,
    };
    if (searchString != "" && sort != "" && sort === "likes") {
      blogOptions.where = {
        "$user.email$": req.user,
        [Op.or]: [
          { title: { [Op.iLike]: `%${searchString}%` } },
          { content: { [Op.iLike]: `%${searchString}%` } },
          { "$tag.name$": { [Op.iLike]: `%${searchString}%` } },
        ],
      };
      blogOptions.order = [
        ["likes", "DESC"],
        ["createdAt", "DESC"],
      ];
    } else if (searchString != "" && sort != "" && sort === "views") {
      blogOptions.where = {
        "$user.email$": req.user,
        [Op.or]: [
          { title: { [Op.iLike]: `%${searchString}%` } },
          { content: { [Op.iLike]: `%${searchString}%` } },
          { "$tag.name$": { [Op.iLike]: `%${searchString}%` } },
        ],
      };
      blogOptions.ordder = [
        ["views", "DESC"],
        ["createdAt", "DESC"],
      ];
    } else if (searchString != "") {
      blogOptions.where = {
        "$user.email$": req.user,
        [Op.or]: [
          { title: { [Op.iLike]: `%${searchString}%` } },
          { content: { [Op.iLike]: `%${searchString}%` } },
          { "$tag.name$": { [Op.iLike]: `%${searchString}%` } },
        ],
      };
      blogOptions.order = [["createdAt", "DESC"]];
    } else if (sort != "" && sort === "likes") {
      blogOptions.where = {
        "$user.email$": req.user,
      };
      blogOptions.order = [
        ["likes", "DESC"],
        ["createdAt", "DESC"],
      ];
    } else if (sort != "" && sort === "views") {
      blogOptions.where = {
        "$user.email$": req.user,
      };
      blogOptions.order = [
        ["views", "DESC"],
        ["createdAt", "DESC"],
      ];
    } else {
      blogOptions.where = {
        "$user.email$": req.user,
      };
      blogOptions.order = [["createdAt", "DESC"]];
    }

    const blogs = await Blog.findAll(blogOptions);
    if (!blogs) {
      return res.status(204).json({ message: "No Blogs found!" });
    }
    res.status(200).json({ blogs: blogs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getUserBlog = async (req, res) => {
  try {
    const username = req.params.username;
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const searchString = req.query.search;
    const sort = req.query.sort;

    if (!username) return res.status(400).json({ message: "Invalid username" });
    const user = await User.findOne({
      where: { username },
      attributes: [
        // include: [
        "id",
        "firstName",
        "lastName",
      ],
    });
    if (!user) return res.status(400).json({ message: "User not found" });

    const [totalViews, _tv] = await sq.query(
      `SELECT count(view) FROM reactions 
        INNER JOIN blogs ON reactions."blogId" = blogs.id 
        where reactions.view = true 
        and blogs."userId" = ${user.id}`
    );

    const [totalLikes, _tl] = await sq.query(
      `SELECT count('like') FROM reactions 
        INNER JOIN blogs ON reactions."blogId" = blogs.id 
        where reactions."like" = true 
        and blogs."userId" = ${user.id}`
    );

    const attributes = {
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
            '(SELECT COUNT("like") FROM reactions WHERE "blogId" = blog.id AND reactions."like" = true)'
          ),
          "likes",
        ],
      ],
    };
    const include = [
      {
        model: Tag,
        as: "tag",
        attributes: ["id", "name"],
      },
      {
        model: User,
        as: "user",
        attributes: ["id", "username", "firstName", "lastName"],
      },
    ];
    const blogOptions = {
      offset,
      limit,
      attributes,
      include,
    };
    if (searchString != "" && sort != "" && sort === "likes") {
      blogOptions.where = {
        [Op.or]: [
          { title: { [Op.iLike]: `%${searchString}%` } },
          { content: { [Op.iLike]: `%${searchString}%` } },
          { "$tag.name$": { [Op.iLike]: `%${searchString}%` } },
        ],
      };
      blogOptions.order = [
        ["likes", "DESC"],
        ["createdAt", "DESC"],
      ];
    } else if (searchString != "" && sort != "" && sort === "views") {
      blogOptions.where = {
        [Op.or]: [
          { title: { [Op.iLike]: `%${searchString}%` } },
          { content: { [Op.iLike]: `%${searchString}%` } },
          { "$tag.name$": { [Op.iLike]: `%${searchString}%` } },
        ],
      };
      blogOptions.ordder = [
        ["views", "DESC"],
        ["createdAt", "DESC"],
      ];
    } else if (searchString != "") {
      blogOptions.where = {
        [Op.or]: [
          { title: { [Op.iLike]: `%${searchString}%` } },
          { content: { [Op.iLike]: `%${searchString}%` } },
          { "$tag.name$": { [Op.iLike]: `%${searchString}%` } },
        ],
      };
      blogOptions.order = [["createdAt", "DESC"]];
    } else if (sort != "" && sort === "likes") {
      blogOptions.order = [
        ["likes", "DESC"],
        ["createdAt", "DESC"],
      ];
    } else if (sort != "" && sort === "views") {
      blogOptions.order = [
        ["views", "DESC"],
        ["createdAt", "DESC"],
      ];
    } else {
      blogOptions.order = [["createdAt", "DESC"]];
    }

    // const blogs = await Blog.findAll(blogOptions);
    const blogs = await user.getBlog(blogOptions);
    if (!blogs) {
      return res.status(204).json({ message: "No Blogs found!" });
    }
    res.status(200).json({ user: user, totalViews, totalLikes, blogs: blogs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getTagBlog = async (req, res) => {
  try {
    const tagName = req.params.tag;
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const searchString = req.query.search;
    const sort = req.query.sort;

    if (!tagName) return res.status(400).json({ message: "Invalid tag" });
    const tag = await Tag.findOne({
      where: { name: tagName },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username", "firstName", "lastName"],
        },
      ],
    });
    if (!tag) return res.status(400).json({ message: "Tag not found" });
    
    const [totalViews, _tv] = await sq.query(
      `SELECT count(view) FROM reactions 
        INNER JOIN blogs ON reactions."blogId" = blogs.id 
        where reactions.view = true 
        and blogs."tagId" = ${tag.id}`
    );
    
    const [totalLikes, _tl] = await sq.query(
      `SELECT count('like') FROM reactions 
        INNER JOIN blogs ON reactions."blogId" = blogs.id 
        where reactions."like" = true 
        and blogs."tagId" = ${tag.id}`
    );

    const attributes = {
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
            '(SELECT COUNT("like") FROM reactions WHERE "blogId" = blog.id AND reactions."like" = true)'
          ),
          "likes",
        ],
      ],
    };
    const include = [
      {
        model: Tag,
        as: "tag",
        attributes: ["id", "name"],
      },
      {
        model: User,
        as: "user",
        attributes: ["id", "username", "firstName", "lastName"],
      },
    ];
    const blogOptions = {
      offset,
      limit,
      attributes,
      include,
    };
    if (searchString != "" && sort != "" && sort === "likes") {
      blogOptions.where = {
        [Op.or]: [
          { title: { [Op.iLike]: `%${searchString}%` } },
          { content: { [Op.iLike]: `%${searchString}%` } },
          { "$tag.name$": { [Op.iLike]: `%${searchString}%` } },
        ],
      };
      blogOptions.order = [
        ["likes", "DESC"],
        ["createdAt", "DESC"],
      ];
    } else if (searchString != "" && sort != "" && sort === "views") {
      blogOptions.where = {
        [Op.or]: [
          { title: { [Op.iLike]: `%${searchString}%` } },
          { content: { [Op.iLike]: `%${searchString}%` } },
          { "$tag.name$": { [Op.iLike]: `%${searchString}%` } },
        ],
      };
      blogOptions.ordder = [
        ["views", "DESC"],
        ["createdAt", "DESC"],
      ];
    } else if (searchString != "") {
      blogOptions.where = {
        [Op.or]: [
          { title: { [Op.iLike]: `%${searchString}%` } },
          { content: { [Op.iLike]: `%${searchString}%` } },
          { "$tag.name$": { [Op.iLike]: `%${searchString}%` } },
        ],
      };
      blogOptions.order = [["createdAt", "DESC"]];
    } else if (sort != "" && sort === "likes") {
      blogOptions.order = [
        ["likes", "DESC"],
        ["createdAt", "DESC"],
      ];
    } else if (sort != "" && sort === "views") {
      blogOptions.order = [
        ["views", "DESC"],
        ["createdAt", "DESC"],
      ];
    } else {
      blogOptions.order = [["createdAt", "DESC"]];
    }

    const blogs = await tag.getBlog(blogOptions);
    if (!blogs) {
      return res.status(204).json({ message: "No Blogs found!" });
    }
    res.status(200).json({ tag: tag, totalViews, totalLikes, blogs: blogs });
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
          attributes: ["id", "username", "firstName", "lastName"],
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

const getBlogDetailForEdit = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      where: { slug: req.params.slug },
      attributes: ["image", "title", "content"],
      include: [
        {
          model: Tag,
          as: "tag",
          attributes: ["id", "name"],
        },
        {
          model: User,
          as: "user",
          attributes: ["email"],
        },
      ],
    });
    if (!blog) {
      return res.status(204).json({ message: "No Blog found!" });
    }
    if (blog.user.email !== req.user) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this blog" });
    }
    res.status(200).json({ blog: blog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getBlog,
  getMyBlog,
  getUserBlog,
  getTagBlog,
  getBlogDetail,
  getBlogDetailForEdit,
};

const { sq } = require("../config/dbConn");
const { DataTypes } = require("sequelize");
const SequelizeSlugify = require("sequelize-slugify");

const Blog = sq.define("blog", {
  slug: {
    type: DataTypes.STRING,
    unique: true,
  },

  image: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  content: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
  },
});

SequelizeSlugify.slugifyModel(Blog, {
  source: ["title"],
});

module.exports = Blog;

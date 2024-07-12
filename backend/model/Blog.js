const { sq } = require("../config/dbConn");
const { DataTypes } = require("sequelize");

const Blog = sq.define("blog", {
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
    type: DataTypes.TEXT('long'),
    allowNull: false,
  },
});

module.exports = Blog;
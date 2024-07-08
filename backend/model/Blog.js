const { sq } = require("../config/dbConn");
const { DataTypes } = require("sequelize");
const User = require("./User");
const Tag = require("./Tag");

const Blog = sq.define("blog", {
  header: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Blog.associate = function (models) {
  Blog.belongsTo(models.user, {
    foreignKey: {
      name: "userId",
      allowNull: false,
    },
    as: "Author",
  });
};
Blog.associate = function (models) {
  Blog.belongsTo(models.tag, {
    foreignKey: {
      name: "tagId",
      allowNull: false,
    },
    as: "Tag",
  });
};

Blog.sync({ alter: true }).then(() => {
  console.log("Blog Model synced");
});

module.exports = Blog;
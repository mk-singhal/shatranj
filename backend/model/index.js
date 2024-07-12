const User = require("./User");
const Blog = require("./Blog");
const Tag = require("./Tag");

User.hasMany(Tag, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  as: "tag"
});
Tag.belongsTo(User, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  as: "user"
});

User.hasMany(Blog, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  as: "blog"
});
Blog.belongsTo(User, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  as: "user"
});

Tag.hasMany(Blog, {
  foreignKey: {
    name: "tagId",
    allowNull: false,
  },
  as: "blog"
});
Blog.belongsTo(Tag, {
  foreignKey: {
    name: "tagId",
    allowNull: false,
  },
  as: "tag"
});

User.sync().then(() => {
  console.log("User Model synced");
});

Blog.sync().then(() => {
  console.log("Blog Model synced");
});

Tag.sync().then(() => {
  console.log("Tag Model synced");
});

module.exports = { Tag, User, Blog };

if (process.argv[2] === "manik") require("dotenv").config();
const User = require("./User");
const Blog = require("./Blog");
const Tag = require("./Tag");
const Reaction = require("./Reaction");

// User has many Tags
// Tag belongs to one User
User.hasMany(Tag, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  as: "tag",
});
Tag.belongsTo(User, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  as: "user",
});

// User has many Blogs
// Blog belongs to one User
User.hasMany(Blog, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  as: "blog",
});
Blog.belongsTo(User, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  as: "user",
});

// Tag has many Blogs
// Blog belongs to one Tag
Tag.hasMany(Blog, {
  foreignKey: {
    name: "tagId",
    allowNull: false,
  },
  as: "blog",
});
Blog.belongsTo(Tag, {
  foreignKey: {
    name: "tagId",
    allowNull: false,
  },
  as: "tag",
});

// Using Sequelize super many-to-many
// association on User, Blog & Reaction
User.belongsToMany(Blog, { through: Reaction });
Blog.belongsToMany(User, { through: Reaction });
User.hasMany(Reaction);
Reaction.belongsTo(User);
Blog.hasMany(Reaction);
Reaction.belongsTo(Blog);

if (process.argv[2] === "manik") {
  User.sync({ alter: true }).then(() => {
    console.log("User Model altered");
  });
  Blog.sync({ alter: true }).then(() => {
    console.log("Blog Model altered");
  });
  Tag.sync({ alter: true }).then(() => {
    console.log("Tag Model altered");
  });
  Reaction.sync({ alter: true }).then(() => {
    console.log("Reaction Model altered");
  });
} else {
  User.sync().then(() => {
    console.log("User Model synced");
  });
  Blog.sync().then(() => {
    console.log("Blog Model synced");
  });
  Tag.sync().then(() => {
    console.log("Tag Model synced");
  });
  Reaction.sync().then(() => {
    console.log("Reaction Model synced");
  });
}

module.exports = { Tag, User, Blog, Reaction };

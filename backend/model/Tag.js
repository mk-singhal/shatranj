const { sq } = require("../config/dbConn");
const { DataTypes } = require("sequelize");
const User = require("./User");
const Blog = require("./Blog");

const Tag = sq.define("tag", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Tag.associate = function (models) {
  Tag.hasMany(models.blog);
};
Tag.associate = function (models) {
  Tag.belongsTo(models.user, {
    foreignKey: {
      name: "userId",
      allowNull: false,
    },
    as: "user",
  });
};

Tag.sync({ alter: true }).then(() => {
  console.log("Tag Model synced");
});

module.exports = Tag;
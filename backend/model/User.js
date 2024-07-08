const { sq } = require("../config/dbConn");
const { DataTypes } = require("sequelize");
const Blog = require("./Blog");
const Tag = require("./Tag");

const User = sq.define("user", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  lastName: {
    type: DataTypes.STRING,
  },
  
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  refreshToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

User.associate = function (models) {
  User.hasMany(models.blog);
};

User.associate = function (models) {
  User.hasMany(models.tag);
};

User.sync({ alter: true }).then(() => {
  console.log("User Model synced");
});

module.exports = User;
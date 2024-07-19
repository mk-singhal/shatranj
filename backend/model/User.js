const { sq } = require("../config/dbConn");
const { DataTypes } = require("sequelize");

const User = sq.define("user", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

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
});

module.exports = User;

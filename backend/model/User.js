const { sq } = require("../config/dbConn");
const { DataTypes } = require("sequelize");

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

module.exports = User;
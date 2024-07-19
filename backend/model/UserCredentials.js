const { sq } = require("../config/dbConn");
const { DataTypes } = require("sequelize");

const UserCredentials = sq.define("user_credential", {
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  refreshToken: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
  },
});

module.exports = UserCredentials;

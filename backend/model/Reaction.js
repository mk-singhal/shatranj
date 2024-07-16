const { sq } = require("../config/dbConn");
const { DataTypes } = require("sequelize");

const Reaction = sq.define("reaction", {
  like: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },

  view: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = Reaction;

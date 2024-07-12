const { sq } = require("../config/dbConn");
const { DataTypes } = require("sequelize");;

const Tag = sq.define("tag", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Tag;
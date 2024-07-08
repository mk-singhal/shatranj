// const mongoose = require("mongoose");

// const mongoDb = async () => {
//   try {
//     await mongoose.connect(process.env.DATABASE_URI, {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };

const { Sequelize } = require("sequelize");

const psqlDb = new Sequelize(
  process.env.POSTGRESQL_DATABASE,
  process.env.POSTGRESQL_USERNAME,
  process.env.POSTGRESQL_PASSWORD,
  {
    dialect: "postgres",
    host: "localhost",
    port: process.env.POSTGRESQL_PORT,
    logging: false,
  }
);
// const psqlDb = new Sequelize(process.env.POSTGRESQL_DATABASE_URI)
const testDbConnection = async () => {
  try {
    await psqlDb.authenticate();
    console.log(`PostgreSQL server running`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
testDbConnection();

// import { createClient } from 'redis';

// const client = createClient();

// client.on('error', err => console.log('Redis Client Error', err));

// await client.connect();

// module.exports = { mongoDb, sq: psqlDb };
module.exports = { sq: psqlDb };

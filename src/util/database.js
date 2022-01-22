const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_LOGIN,
  process.env.DATABASE_PWD,
  {
    dialect: 'mysql',
    host: process.env.DATABASE_HOST,
    ssl: true,
    port: process.env.DATABASE_PORT,
  }
);

module.exports = sequelize;

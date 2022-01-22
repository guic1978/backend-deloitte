'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
const db = {};

// config.retry = {
//   match: [
//     Sequelize.ConnectionError,
//     Sequelize.ConnectionTimedOutError,
//     Sequelize.TimeoutError,
//     /Deadlock/i,
//     'SQLITE_BUSY',
//   ],
//   max: 3,
// };

let sequelize = new Sequelize(
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

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

const Sequelize = require('sequelize');

const db = {};

const sequelize = new Sequelize(
  'adfoodio',
  'root',
  'root',
  {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    pool: {
      max: 20,
      min: 0,
      acquire: 60000,
      idle: 10000
    },
  }
);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;

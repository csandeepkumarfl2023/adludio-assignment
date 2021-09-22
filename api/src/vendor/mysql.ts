import {Sequelize} from'sequelize';
// const config = require('../config');
import config from '../config/config'
const {
  host,
  name,
  username,
  password,
  port
} = config.database

// Option 1: Passing parameters separately
const sequelize = new Sequelize(name, username, password, {
  host: host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false
})

const seq = {
    sequelize: sequelize,
    Sequelize: Sequelize,
  }

export default seq
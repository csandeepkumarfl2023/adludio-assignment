// const { sequelize, Sequelize } = require('../vendor/mysql');

import seq from "../vendor/mysql";
import { INTEGER, STRING } from "sequelize";

const UserModel = seq.sequelize.define(
  "users",
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    deviceId: {
      type: STRING,
    },
    createdAt: {
      type: STRING,
    },
    updatedAt: {
      type: STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default UserModel;

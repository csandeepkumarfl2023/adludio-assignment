// const { sequelize, Sequelize } = require('../vendor/mysql');

import seq from "../vendor/mysql";
import { INTEGER, STRING } from "sequelize";

const OrdersModel = seq.sequelize.define(
  "orders",
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: STRING,
    },
    billingAmount: {
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

export default OrdersModel;

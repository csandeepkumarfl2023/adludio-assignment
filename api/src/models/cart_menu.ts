// const { sequelize, Sequelize } = require('../vendor/mysql');

import seq from "../vendor/mysql";
import { INTEGER, STRING } from "sequelize";

const CartMenuModel = seq.sequelize.define(
  "cart_menu",
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    menuId: {
      type: STRING,
    },
    userId: {
      type: STRING,
    },
    orderId: {
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

export default CartMenuModel;

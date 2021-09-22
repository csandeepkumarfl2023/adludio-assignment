// const { sequelize, Sequelize } = require('../vendor/mysql');

import seq from'../vendor/mysql';
import { INTEGER, STRING} from'sequelize';

const MenuModel = seq.sequelize.define('menu',
{
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: STRING,
    },
    name: {
        type: INTEGER,
    },
    price: {
        type: INTEGER,
    },
    createdAt: {
        type: STRING,
    },
    updatedAt: {
        type: STRING,
    },
}, {
    freezeTableName: true,
    timestamps: false
} );

export default MenuModel

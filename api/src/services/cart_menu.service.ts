import DB from "../models";
const { Op } = require("sequelize");

export const createCartMenu = async (data:any) => {
  try {
    let cart = await DB.CartMenuModel.create(data);
    return cart;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getAllCartMenu = async (userId:any) => {
  try {
    let query = {
      where: {
        userId,
        orderId: {
          [Op.eq]: null
        }
      },
      include: [{model: DB.MenuModel}]
    }
    let cart = await DB.CartMenuModel.findAll(query);
    return cart;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const removeCartMenu = async (query: any) => {
  try{
    let res = await DB.CartMenuModel.destroy(query)
    return res
  } catch (err: any) {
    throw new Error(err);
  }
}

export const updateCartMenu = async (data:any, query: any) => {
  try{
    let res = await DB.CartMenuModel.update(data, query)
    return res
  } catch (err: any) {
    throw new Error(err);
  }
}



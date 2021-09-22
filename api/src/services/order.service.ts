import DB from "../models";

export const createOrder = async (data:any) => {
  try {
    let order = await DB.OrdersModel.create(data);
    return order;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getAllOrders = async (userId: any) => {
  try {
    let query = {
      where: {
        userId
      }
    }
    let orders = await DB.OrdersModel.findAll(query);
    return orders;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getOrder = async (id:any) => {
  try {
    let query = {
      where: {
        id
      }
    }
    let order = await DB.OrdersModel.findOne(query);
    return order;
  } catch (err: any) {
    throw new Error(err);
  }
};



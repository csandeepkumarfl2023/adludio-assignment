import { updateCartMenu } from "../services/cart_menu.service";
import { createOrder, getAllOrders, getOrder } from "../services/order.service";
const { Op } = require("sequelize");

export const create = async (req: any, res: any) => {
  try {
    let data = req.body
    let order:any = await createOrder(data);
    let cartData = {
      orderId: order.id
    }
    let cartQuery = {
      where: {
        userId: data.userId,
        orderId: {
          [Op.eq]: null
        }
      }
    }
    await updateCartMenu(cartData, cartQuery)
    return res.status(200).send({ order });
  } catch (err: any) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the order",
      code: err.code || 500,
    });
  }
};

export const getAll = async (req: any, res: any) => {
  try {
    let order = await getAllOrders(req.query.userId);
    return res.status(200).send({ order });
  } catch (err: any) {
    res.status(500).send({
      message: err.message || "Error occurred while retrieving the orders",
      code: err.code || 500,
    });
  }
};

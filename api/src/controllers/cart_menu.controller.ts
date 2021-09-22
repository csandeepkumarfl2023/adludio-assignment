import { createCartMenu, getAllCartMenu, removeCartMenu } from "../services/cart_menu.service";

export const create = async (req: any, res: any) => {
  try {
    let data = req.body
    let cart = await createCartMenu(data);
    return res.status(200).send({ cart });
  } catch (err: any) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the cart",
      code: err.code || 500,
    });
  }
};

export const getAll = async (req: any, res: any) => {
  try {
    const { userId } = req.query
    let cart = await getAllCartMenu(userId);
    return res.status(200).send({ cart });
  } catch (err: any) {
    res.status(500).send({
      message: err.message || "Error occurred while retrieving the cart",
      code: err.code || 500,
    });
  }
};

export const deleteCartMenu = async (req: any, res: any) => {
  try {
    const { id } = req.params
    let query = {
      where: {
        id
      }
    }
    await removeCartMenu(query);
    return res.status(200).send({ message: 'Success' });
  } catch (err: any) {
    res.status(500).send({
      message: err.message || "Error occurred while deleting the cart",
      code: err.code || 500,
    });
  }
};

import { getAllMenu } from "../services/menu.service";

export const getAll = async (req: any, res: any) => {
  try {
    let menu = await getAllMenu();
    return res.status(200).send({ result: menu });
  } catch (err: any) {
    res.status(500).send({
      message: err.message || "Error occurred while retrieving the menu",
      code: err.code || 500,
    });
  }
};

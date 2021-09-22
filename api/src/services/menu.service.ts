import DB from "../models";

export const getAllMenu = async () => {
  try {
    let menu = await DB.MenuModel.findAll();
    return menu;
  } catch (err: any) {
    throw new Error(err);
  }
};

import DB from "../models";

export const createUser = async (data:any) => {
  try {
    let user = await DB.UserModel.create(data);
    return user;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getUser = async (query:any) => {
  try {
    let user = await DB.UserModel.findOne(query);
    return user;
  } catch (err: any) {
    throw new Error(err);
  }
};



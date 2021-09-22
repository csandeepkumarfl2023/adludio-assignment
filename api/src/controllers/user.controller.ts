import { createUser, getUser } from "../services/user.service";

export const create = async (req: any, res: any) => {
  try {
    let data = req.body
    let existingUser = await getUser({where: {deviceId: data.deviceId}})
    if(existingUser) {
      return res.status(200).send({ user: existingUser});
    }
    let user = await createUser(data);
    return res.status(200).send({ user: user });
  } catch (err: any) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the user",
      code: err.code || 500,
    });
  }
};

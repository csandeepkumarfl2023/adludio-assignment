import * as userService from "../services/user.service";
import { create } from "../controllers/user.controller";
import { mockRequest, mockResponse } from "../../utils/interceptor";
const getUser = userService.getUser as any;
const createUser = userService.createUser as any;
jest.mock("../services/user.service", () => ({
  createUser: jest.fn(),
  getUser: jest.fn(),
})); // mocking user service

describe("users controller create method", () => {
  it("should return success with status with 200 for existing user", async () => {
    const req = mockRequest();
    const res = mockResponse();
    let existingUserMock = {
      id: 1,
      name: "test",
    };
    getUser.mockImplementation(() => {
      return existingUserMock;
    });
    await create(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ user: existingUserMock });
  });
  it("should return success with status with 200 for create user", async () => {
    const req = mockRequest();
    const res = mockResponse();
    let newUser = {
      id: 1,
      name: "test",
    };
    getUser.mockImplementation(() => {
      return null;
    });
    createUser.mockImplementation(() => {
      return newUser;
    });
    await create(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ user: newUser });
  });
  it("should return success with status with 500", async () => {
    const req = mockRequest();
    const res = mockResponse();
    getUser.mockImplementation(() => {
      return null;
    });
    createUser.mockImplementation(() => {
      throw { message: "cannot create user" };
    });
    await create(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

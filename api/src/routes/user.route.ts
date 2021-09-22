import { Router } from 'express';
import * as UserController  from '../controllers/user.controller'

// Init shared
const userRouter = Router();

userRouter.post('/', UserController.create)


export default userRouter;

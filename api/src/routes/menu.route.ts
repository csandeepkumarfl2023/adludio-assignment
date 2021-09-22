import { Router } from 'express';
import * as MenuController  from '../controllers/menu.controller'

// Init shared
const menuRouter = Router();

menuRouter.get('/', MenuController.getAll)


export default menuRouter;

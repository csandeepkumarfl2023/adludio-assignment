import { Router } from 'express';
import * as CartMenuController  from '../controllers/cart_menu.controller'

// Init shared
const cartMenuRouter = Router();

cartMenuRouter.post('/', CartMenuController.create)
cartMenuRouter.get('/', CartMenuController.getAll)
cartMenuRouter.delete('/:id', CartMenuController.deleteCartMenu)

export default cartMenuRouter;

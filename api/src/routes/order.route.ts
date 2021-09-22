import { Router } from 'express';
import * as OrderController  from '../controllers/order.controller'

// Init shared
const orderRouter = Router();

orderRouter.post('/', OrderController.create)
orderRouter.get('/', OrderController.getAll)


export default orderRouter;

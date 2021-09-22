import { Router } from 'express';
import CartMenuRouter from './cart_menu.route';
import MenuRouter from './menu.route';
import OrderRouter from './order.route';
import UserRouter from './user.route';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/menu', MenuRouter);
router.use('/user', UserRouter);
router.use('/order', OrderRouter);
router.use('/cart_menu', CartMenuRouter);

// Export the base-router
export default router;

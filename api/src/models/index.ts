import MenuModel from './menu';
import UserModel from './user';
import OrdersModel from './order';
import CartMenuModel from './cart_menu'

CartMenuModel.belongsTo(MenuModel, {foreignKey: 'menuId'})

export default {
  MenuModel,
  UserModel,
  OrdersModel,
  CartMenuModel
}



import React, { useEffect } from "react";
import {
  Button,
  Container,
  Divider,
  ListItemSecondaryAction,
  Paper,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import GoBackIcon from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Alert, AlertTitle } from "@material-ui/lab";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import {
  getAllCartMenuService,
  deleteCartMenuService,
} from "../services/cart_menu.service";
import  { createOrderService } from '../services/order.service'
import { reminderNotification } from "../helper/notify.helper";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    marginTop: 25,
  },
  orderBtn: {
    margin: theme.spacing(1)
  },
  orderBtnDiv: {
    display: 'flex',
    justifyContent: 'flex-start'
  },
  fullWidth: {
    width: "100%",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: 20,
    display: "flex",
  },
  emptyCartContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  marginTopCustom: {
    marginTop: 20,
  },
  priceContainer: {
    padding: 15,
    marginTop: 20,
  },
  discountText: {
    color: "green",
  },
  totalText: {
    fontWeight: "bold",
  },
  prodContainer: {
    marginTop: 20,
  },
}));
const Cart = () => {
  const classes = useStyles();

  const [cartMenu, setCartMenu] = React.useState<any>([]);
  const [showAlert, setShowAlert] = React.useState<boolean>(false);
  const [alertTitle, setAlertTitle] = React.useState<any>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [price, setPrice] = React.useState<any>(null);
  const [discountAmount, setDiscountAmount] = React.useState<any>(null);
  const [totalAmount, setTotalAmount] = React.useState<any>(null);
  const [offerApplied, setOfferApplied] = React.useState<any>("");

  const getCartMenu = async () => {
    let user: any = localStorage.getItem("user");
    user = JSON.parse(user);
    setIsLoading(true);
    let res = await getAllCartMenuService(user.id);
    if (res && res.status === 200) {
      console.log(res.data.cart);
      setCartMenu(res.data.cart);
    }
    setIsLoading(false);
  };

  const deleteHandler = async (id: any) => {
    let res = await deleteCartMenuService(id);
    if (res && res.status === 200) {
      setShowAlert(true);
      setAlertTitle("Item removed from cart");
      getCartMenu();
    }
  };

  const calculateTotal = () => {
    const allMenu = [...cartMenu];
    console.log("allMenu", allMenu);
    let localPrice = 0;
    allMenu.forEach((elem: any) => {
      localPrice += Number(elem.menu.price);
    });
    setPrice(localPrice.toFixed(2));

    let filteredMains = allMenu.filter(
      (elem: any) => elem.menu.type === "Mains"
    );
    let filteredDrinks = allMenu.filter(
      (elem: any) => elem.menu.type === "Drinks"
    );
    let filteredDesserts = allMenu.filter(
      (elem: any) => elem.menu.type === "Desserts"
    );
    console.log(filteredMains, filteredDrinks, filteredDesserts);
    if (
      filteredDrinks.length === 2 &&
      filteredMains.length === 2 &&
      filteredDesserts.length === 1
    ) {
      // Hungry offer
      setTotalAmount(40.00);
      setDiscountAmount(localPrice - 40);
      setOfferApplied("Hungry offer applied");
      // Hungry offer ends
    } else if (filteredDrinks.length && filteredMains.length) {
      // Hot offer logic
      let discountPercent = 10 / 100;
      let minLengthArr;
      if (filteredMains.length < filteredDrinks.length) {
        minLengthArr = filteredMains;
      } else if (filteredMains.length > filteredDrinks.length) {
        minLengthArr = filteredDrinks;
      } else {
        minLengthArr = filteredDrinks;
      }
      let i = 1;
      let DrinksAmount = 0;
      filteredDrinks.map((elem: any) => {
        if (i <= minLengthArr.length) {
          DrinksAmount += +elem.menu.price;
          i += 1;
        }
      });
      let j = 1;
      let MainsAmount = 0;
      filteredMains.map((elem: any) => {
        if (j <= minLengthArr.length) {
          MainsAmount += +elem.menu.price;
          j += 1;
        }
      });
      let localDiscountAmount: any =
        (+DrinksAmount + +MainsAmount) * discountPercent;
      localDiscountAmount = Number(localDiscountAmount).toFixed(2);
      console.log(
        localDiscountAmount,
        DrinksAmount,
        MainsAmount,
        discountPercent
      );
      setDiscountAmount(localDiscountAmount);
      setTotalAmount((localPrice - localDiscountAmount).toFixed(2));
      setOfferApplied("Hot offer applied");
      // Hot offer logic ends
    } else {
      setOfferApplied("");
      setDiscountAmount(0);
      setTotalAmount(localPrice.toFixed(2));
    }
  };

  const placeOrderHandler = async() => {
    let user: any = localStorage.getItem("user");
    user = JSON.parse(user);
    let data = {
      userId: user.id,
      billingAmount: totalAmount
    }
    let res = await createOrderService(data)
    if (res && res.status === 200) {
      setShowAlert(true);
      setAlertTitle("Order placed successfully! Please wait. You will get notified when your order is ready to deliver");
      getCartMenu()
      reminderNotification(new Date(), 'Your order is ready to deliver!')
    }
  }

  useEffect(() => {
    getCartMenu();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [cartMenu]);
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            component={Link}
            to="/dashboard"
          >
            <GoBackIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Cart
          </Typography>
        </Toolbar>
      </AppBar>
      {showAlert ? (
        <div>
          <Alert onClose={() => setShowAlert(false)} severity="success">
            <AlertTitle>{alertTitle}</AlertTitle>
          </Alert>
        </div>
      ) : null}
      {cartMenu.length ? (
        <Container maxWidth="lg" className={classes.container}>
          <Container className={classes.prodContainer}>
            <Paper elevation={3}>
              <List component="nav" className={classes.fullWidth}>
                {cartMenu.map((item: any) => {
                  return (
                    <ListItem key={item.id}>
                      <ListItemText
                        primary={item.menu.name}
                        secondary={
                          <React.Fragment>
                            <Typography>₹{item.menu.price}</Typography>
                          </React.Fragment>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Button
                          onClick={() => deleteHandler(item.id)}
                          variant="contained"
                          className={classes.button}
                          startIcon={<DeleteIcon />}
                        >
                          Remove
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
              <Divider />
              <div className={classes.orderBtnDiv}>
              <Button
                onClick={placeOrderHandler}
                color="primary"
                variant="contained"
                className={classes.orderBtn}
              >
                Place order
              </Button>
              </div>
            </Paper>
          </Container>
          <Container>
            <Paper elevation={3}>
              <div className={classes.priceContainer}>
                <Typography>Price Details</Typography>
              </div>
              <Divider />
              <List component="nav" aria-label="secondary mailbox folders">
                <ListItem>
                  <ListItemText>
                    <Typography>Price ({cartMenu.length} items)</Typography>
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <Typography>₹{price}</Typography>
                  </ListItemSecondaryAction>
                </ListItem>
                {offerApplied ? (
                  <ListItem>
                    <ListItemText>
                      <Typography>Discount ({offerApplied})</Typography>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <Typography className={classes.discountText}>
                        - ₹{discountAmount}
                      </Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                ) : null}

                <ListItem>
                  <ListItemText>
                    <Typography className={classes.totalText}>
                      Total Amount
                    </Typography>
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <Typography className={classes.totalText}>
                      ₹{totalAmount}
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Paper>
          </Container>
        </Container>
      ) : !isLoading ? (
        <Container maxWidth="xs" className={classes.emptyCartContainer}>
          <Typography className={classes.marginTopCustom}>
            Your cart is empty!
          </Typography>
          <Typography className={classes.marginTopCustom}>
            Add items to it now
          </Typography>
          <Button
            component={Link}
            to="/dashboard"
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<ShoppingCartIcon />}
          >
            Shop now
          </Button>
        </Container>
      ) : null}
    </div>
  );
};

export default Cart;

import React, { useEffect } from "react";
import {
  Button,
  Container,
  ListItemSecondaryAction,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import AddIcon from "@material-ui/icons/Add";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { getAllMenuService } from "../services/menu.service";
import {
  createCreateMenuService,
  getAllCartMenuService,
} from "../services/cart_menu.service";
import { getAllOrdersService } from "../services/order.service";
import { reminderNotification } from "../helper/notify.helper";

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const useStyles = makeStyles((theme) => ({
  inline: {
    display: "inline",
  },
  button: {
    margin: theme.spacing(1),
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
  },
  offerContainer: {
    marginBottom: 10,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: 35,
  },
  offerText: {
    fontSize: 19,
    marginBottom: 25,
    fontWeight: 500,
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState([
    "Mains",
    "Drinks",
    "Desserts",
  ]);

  const [data, setData] = React.useState<any>({});
  const [cartMenu, setCartMenu] = React.useState<any>([]);
  const [showAlert, setShowAlert] = React.useState<boolean>(false);
  const [alertTitle, setAlertTitle] = React.useState<any>("");

  const handleChange = (panel: any) => (event: any, newExpanded: any) => {
    let allExpands: any = [...expanded];
    if (allExpands.includes(panel)) {
      allExpands = allExpands.filter((elem: any) => elem !== panel);
    } else {
      allExpands.push(panel);
    }
    allExpands.length ? setExpanded(allExpands) : setExpanded([]);
  };

  const getAllMenu = async () => {
    let res: any;
    res = await getAllMenuService();
    console.log("res", res.result);
    const groupedResult = res.result.reduce(function (r: any, a: any) {
      r[a.type] = r[a.type] || [];
      r[a.type].push(a);
      return r;
    }, Object.create(null));
    console.log(groupedResult);
    setData(groupedResult);
  };

  const addBtnHandler = async (menu: any) => {
    let user: any = localStorage.getItem("user");
    user = JSON.parse(user);
    let data = {
      userId: user.id,
      menuId: menu.id,
    };
    const res = await createCreateMenuService(data);
    if (res && res.status === 200) {
      setShowAlert(true);
      setAlertTitle("Item added to cart");
    }
    getAllCartMenu();
  };

  const getAllCartMenu = async () => {
    let user: any = localStorage.getItem("user");
    user = JSON.parse(user);
    let res = await getAllCartMenuService(user.id);
    if (res && res.status === 200) {
      let ids = res.data.cart.map((elem: any) => elem.menuId);
      console.log(ids);
      setCartMenu(ids);
    }
  };

  const getOrderServiceAndNotify = async() => {
    let user: any = localStorage.getItem("user");
    user = JSON.parse(user);
    let allOrders = await getAllOrdersService(user.id);
    if (allOrders && allOrders.status === 200) {
      allOrders?.data.order.forEach((elem: any) => {
        reminderNotification(new Date(elem.createdAt), 'Your order is ready to deliver')
      });
    }
  }

  useEffect(() => {
    getAllMenu();
    getAllCartMenu();
    // getOrderServiceAndNotify()
  }, []);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            AdFoodio Menu!
          </Typography>
          <Button
            component={Link}
            to="/cart"
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<ShoppingCartIcon />}
          >
            View Cart
          </Button>
        </Toolbar>
      </AppBar>
      {showAlert ? (
        <div>
          <Alert onClose={() => setShowAlert(false)} severity="success">
            <AlertTitle>{alertTitle}</AlertTitle>
          </Alert>
        </div>
      ) : null}
      <Container maxWidth="sm" className={classes.offerContainer}>
        <Typography className={classes.offerText}>
          <i>Hot offer! Get 10% off on each main and drink combo.</i>
        </Typography>
        <Typography className={classes.offerText}>
          <i>
            Hungry Date Offer! Get 2 mains + 2 drinks + 1 dessert for 40.00.
          </i>
        </Typography>
      </Container>
      <Container maxWidth="lg" className={classes.container}>
        {Object.keys(data).map((elem: any, i: any) => {
          return (
            <Accordion
              key={i}
              square
              expanded={expanded.includes(elem)}
              onChange={handleChange(elem)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>{elem}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List component="nav" className={classes.fullWidth}>
                  {data[elem].map((item: any) => {
                    return (
                      <ListItem key={item.id}>
                        <ListItemText
                          primary={item.name}
                          secondary={
                            <React.Fragment>
                              <Typography>₹{item.price}</Typography>
                            </React.Fragment>
                          }
                        />
                        <ListItemSecondaryAction>
                          {cartMenu.includes(item.id) ? (
                            <Button
                              title="Added to cart"
                              variant="contained"
                              color="primary"
                              className={classes.button}
                            >
                              Added
                            </Button>
                          ) : (
                            <Button
                              onClick={() => addBtnHandler(item)}
                              variant="contained"
                              color="primary"
                              className={classes.button}
                              startIcon={<AddIcon />}
                            >
                              Add
                            </Button>
                          )}
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Container>
    </div>
  );
};

export default Dashboard;

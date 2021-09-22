import React, {useEffect} from "react";
import logo from "./logo.png";
import "./App.css";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import {DeviceUUID} from 'device-uuid';
import { createUserService } from "./services/user.service";
import { getAllOrdersService } from "./services/order.service";
import { reminderNotification } from "./helper/notify.helper";

function App() {

  const saveUserDeviceToken = async() => {
    const du = new DeviceUUID().parse();
    const dua = [
      du.language,
      du.platform,
      du.os,
      du.cpuCores,
      du.isAuthoritative,
      du.silkAccelerated,
      du.isKindleFire,
      du.isDesktop,
      du.isMobile,
      du.isTablet,
      du.isWindows,
      du.isLinux,
      du.isLinux64,
      du.isMac,
      du.isiPad,
      du.isiPhone,
      du.isiPod,
      du.isSmartTV,
      du.pixelDepth,
      du.isTouchScreen
    ];
    const uuid = du.hashMD5(dua.join(':'));
    const data = {
      deviceId: uuid
    }
    let res = await createUserService(data)
    console.log('user', res)
    if(res && res.user) {
      localStorage.setItem('user', JSON.stringify(res.user))
    }
  }

  // const getOrderServiceAndNotify = async() => {
  //   let user: any = localStorage.getItem("user");
  //   user = JSON.parse(user);
  //   let allOrders = await getAllOrdersService(user.id);
  //   if (allOrders && allOrders.status === 200) {
  //     allOrders?.data.order.forEach((elem: any) => {
  //       reminderNotification(new Date(elem.createdAt), 'Your order is ready to deliver')
  //     });
  //   }
  // }

  useEffect(() => {
    saveUserDeviceToken()
    // getOrderServiceAndNotify()
  },[])
  

  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Button variant="contained" color="primary" component={Link} to="/dashboard">
            Get Started
          </Button>
        </header>
      </div>
  );
}

export default App;

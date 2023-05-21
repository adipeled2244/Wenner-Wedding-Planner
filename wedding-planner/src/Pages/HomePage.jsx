import React from "react";
import Head from "../Components/Head/Head";
import WeddingDetails from "../Components/WeddingDetails/WeddingDetails";
import PieChart from "../Components/PieChartCmp/PieChartCmp";
import StatusAttending from "../Components/StatusAttending/StatusAttending";
// import GuestsStatuses from "../Components/GuestStatuses/GuestsStatuses";
// import Seats from "../Components/Seats/Seats";
import Checklist from "../Components/Checklist/Checklist";
import classes from "./HomePage.module.css";
import Statuses from "../Components/Statuses/Statuses";
 import { useRouteLoaderData } from "react-router-dom";
 import {getUser, updateUser} from "../ServerApi/userApi";
import { useContext } from "react";
import UserContext from "../Store/user-context";

 import { useEffect } from "react";
 import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = (props) => {

  const {user}=useContext(UserContext);


  return <>
    <Head headerName={`${user.brideName} and ${user.groomName} wedding`}  />

    <div className={classes.container}>
      <WeddingDetails  />
      <Statuses  />
      <Checklist  />
    </div>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
  </>;
};


export default HomePage;
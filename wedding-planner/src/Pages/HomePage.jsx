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
const HomePage = (props) => {

  // const headerName = "Sally and sammy wedding";
  const userCtx=useContext(UserContext);

  // const {User} = useRouteLoaderData('root');
  // console.log(User);

  const getUserById=async(id)=>{
    try{
    const res= await getUser(id);
    userCtx.setUser(res.user);
    return user;
    }catch (err) {
      };
   
  }


  useEffect( () => {
   
     getUserById("6463f4b5954d0fa53015acdd");
      //save context
  }, []);

  return <>
    <Head headerName={`${userCtx.brideName} and ${userCtx.groomName} wedding`}  />

    <div className={classes.container}>
      <WeddingDetails  />
      <Statuses  />
      <Checklist  />
    </div>
  </>;
};


export default HomePage;
import classes from "./HomePage.module.css";
import React from "react";
import Head from "../Components/Global/Head/Head";
import WeddingDetails from "../Components/Home/WeddingDetails/WeddingDetails";
import Checklist from "../Components/Home/Checklist/Checklist";
import Statuses from "../Components/Home/Statuses/Statuses";
import { useContext } from "react";
import UserContext from "../Store/user-context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastContainerConfig } from "../Utils/constants";

const HomePage = (props) => {
  const { user } = useContext(UserContext);

  return (
    <>
      <Head headerName={`${user.brideName} and ${user.groomName} wedding`} />

      <div className={classes.container}>
        <WeddingDetails />
        <Statuses />
        <Checklist />
      </div>
      <ToastContainer
        { ...toastContainerConfig }
      />
      <ToastContainer />
    </>
  );
};

export default HomePage;

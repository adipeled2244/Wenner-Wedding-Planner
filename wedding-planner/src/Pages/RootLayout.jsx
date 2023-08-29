import React from 'react';
import { Outlet } from 'react-router-dom';
import MainNavigation from '../Components/Global/MainNavigation/MainNavigation';
import { toastContainerConfig } from "../Utils/Constants/toastConfig";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 
const RootLayout=(props)=>{

  return <>
    <MainNavigation/>
        <Outlet/>
        <ToastContainer
       {...toastContainerConfig}
      />
      <ToastContainer />
    
  </>
}

export default RootLayout;

 
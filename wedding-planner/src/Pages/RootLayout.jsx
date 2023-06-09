import React from 'react';
import { Outlet } from 'react-router-dom';
import MainNavigation from '../Components/Global/MainNavigation/MainNavigation';
import { toastContainerConfig } from "../Utils/Constants/toastConfig";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// get window height in pixels

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

//get user
// export const loader=()=>{

//   const User={
//     name: "adi peled",
//     email: "adipeled224@gmail.com",
//     phone: "054-1234567",
//     address: "tel aviv",
//     weddingDate: "2021-10-10",
//     weddingLocation: "tel aviv",
//     weddingTime: "20:00pm",
//     weddingVenue: "Amare",
//     weddingVenueAddress: "rishon lezion",
//     groomName: "Shay",
//     brideName: "Adi",
//     checklist:[],
//     guests: [
      
//     ]
//   }
//   return {User};
// }
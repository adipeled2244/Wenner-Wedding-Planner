import React from 'react';
import { Outlet } from 'react-router-dom';
import MainNavigation from '../Components/MainNavigation/MainNavigation';

const RootLayout=(props)=>{
    return <>
    <MainNavigation/>
    <main>
        <Outlet/>
    </main>
  </>
}

export default RootLayout;


//geet user
export const loader=()=>{

  const User={
    name: "adi peled",
    email: "adipeled224@gmail.com",
    phone: "054-1234567",
    address: "tel aviv",
    weddingDate: "2021-10-10",
    weddingLocation: "tel aviv",
    weddingTime: "20:00pm",
    weddingVenue: "Amare",
    weddingVenueAddress: "rishon lezion",
    groomName: "Shay",
    brideName: "Adi",
    checklist:[
      { label: "DG", checked: true },
    { label: "Hair", checked: true },
    { label: "Dress", checked: true },
    { label: "Food tasting", checked: false },
    { label: "Alcohol", checked: false },
    { label: "DG", checked: true }],
    guests: [
      {
        id: 1,
        name: "adi peled",
        email: "",
        phone: "",
        address: "",
        status: "confirmed",
        table: 1,
        seat: 1,
        side: "bride",
        group: "family",
        attending: 2
      }
    ]
  }
  return {User};
}
import React from "react";

const UserContext = React.createContext({
  id: "",
  name: "",
  email: " ",
  phone: " ",
  address: " ",
  weddingDate: " ",
  weddingLocation: " ",
  weddingTime: " ",
  weddingVenue: "",
  weddingVenueAddress: "",
  groomName: "",
  brideName: "",
  img: "",
  checklist: [
  ],
  guests: [
    
  ],
    addGuest: (guest) => {},
    removeGuest: (guestId) => {},
    updateGuest: (guest) => {},
    setUser: (user) => {},

});

export default UserContext;

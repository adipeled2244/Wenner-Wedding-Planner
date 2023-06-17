import React, { useEffect, useState } from "react";

import UserContext from "./user-context";
import {
  updateUser,
  addGuestToUser,
  getUser,
  updateUserGuest,
  addTableToUser,
  signup,
  login,
} from "../ServerApi/userApi";
import { toast } from "react-toastify";
// import { debounce } from "lodash";

function UserProvider(props) {
  const [user, setUser] = useState({
    _id: "1",
    name: "",
    email: "",
    phone: "",
    address: "",
    weddingDate: "",
    weddingLocation: "",
    weddingTime: "",
    weddingVenue: "",
    img: "",
    weddingVenueAddress: "",
    groomName: "",
    brideName: "",
    checklist: [],
    guests: [],
  });

  async function handleSignup(user) {

    try{
      const res = await signup(user);
    if (res.status === 200) {
      const token = res.data.token;
      const user = res.data.user;
      setUser(user);
      localStorage.setItem("token", token)
      return { status: 200, message: "login success" } // need redieect
    }
    else{

    }
    }catch(err){
      return { status: err.response.status, message: err.response.data.error };
    }
    

  
    //toaster error
  }

  async function handleLogin(name, password) {
    console.log(name, password);
    let res;
    try {
      res = await login({ name, password }); // why nit going to else?? only to catach if status!=200
      console.log(res)
      if (res.status === 200) {
        const token = res.data.token;
        const user = res.data.user;
        console.log(res.data.user)
        setUser(user);
        localStorage.setItem("token", token);
        localStorage.setItem("userContext", JSON.stringify(user));

        return { status: 200, message: "login success" };
      } else {
        return { status: 400, message: "login not success" };
      }
    } catch (err) {
      return { status: err.response.status, message: err.response.data.error };
    }

    //toaster error
  }

 

  async function updateChecklist(checklist) {
    console.log("in provider")
    const res = await updateUser(user._id, { checklist });
    if (res.status === 200) {
      setUser({ ...user, checklist });
    }
  }

  async function addGuest(guest) {
    const res = await addGuestToUser(user._id, { guest });
    guest._id = res.data.guest._id;
    if (res.status === 200) {
      setUser({ ...user, guests: [...user.guests, guest] });
    }
  }

  async function addTable(table) {
    const tableNumber = user.tables.length
      ? user.tables[user.tables.length - 1].tableNumber + 1
      : 1;
    table.tableNumber = tableNumber;
    table.x = 0;
    table.y = 0;
    
    const res = await addTableToUser(user._id, { table });
    table._id = res.data.table._id;

    if (res.status === 200) {
      setUser({ ...user, tables: [...user.tables, table] });
    }
  }

  async function updateGuests(guests, body) {
    const updatedGuests = await Promise.all(
      guests.map(async (guestId) => {
        const res = await updateUserGuest(user._id, guestId, body);
        if (res.status === 200) {
          const updatedGuest = user.guests.find(
            (guest) => guest._id === guestId
          );
          return {
            ...updatedGuest,
            invitation: true,
          };
        }
        return null; // Failed to update, return null or handle error as needed
      })
    );

    // Replace the old guests with the updated ones
    const finalGuests = user.guests.map((guest) => {
      const updatedGuest = updatedGuests.find(
        (updated) => updated && updated._id === guest._id
      );
      return updatedGuest ? updatedGuest : guest;
    });

    setUser({ ...user, guests: finalGuests });
  }

  async function updateTables(tables) {
    const res = await updateUser(user._id, { tables });
    if (res.status === 200) {
      setUser({ ...user, tables });
    }
  }

  const userContext = {
    user,
    setUser,
    updateChecklist,
    addGuest,
    updateGuests,
    updateTables,
    addTable,
    handleSignup,
    handleLogin,
  };

  // IN REFRESH INITALIZE THE CONTEXT
  useEffect(() => {
    if(localStorage.getItem("userContext")){
      setUser(JSON.parse(localStorage.getItem("userContext")))
    }
  }, []);

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider;

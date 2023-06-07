import React, { useEffect, useState } from "react";
import UserContext from "./user-context";
import {
  updateUser,
  addGuestToUser,
  getUser,
  updateUserGuest,
  addTableToUser,
} from "../ServerApi/userApi";
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

  async function updateChecklist(checklist) {
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
    table.selectedMaxSeats = Number(table.tableMaxPeople);
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

  useEffect(() => {
    async function fetchData() {
      const res = await getUser("6463f4b5954d0fa53015acdd");
      if (res.status === 200) {
        setUser(res.data.user);
      }
    }
    //TODO:  init user from server

    fetchData();
  }, []);

  const userContext = {
    user,
    setUser,
    updateChecklist,
    addGuest,
    updateGuests,
    updateTables,
    addTable,
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider;

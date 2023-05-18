import React from "react";
import UserContext from "./user-context";
import {updateUser} from "../ServerApi/userApi";

const updateUserById=async(id,body)=>{
    try{
    const res= await updateUser(id,body);
    return res;
    }catch (err) {
        };
    }
const detaultUserState = {
    id:"",
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
  checklist: [

  ],
  guests: [],
};

const userReducer = (state, action) => {
  if (action.type === "SET_USER") {
    console.log(action.user._id);
    return {
       id: action.user._id,
      name: action.user.name,
      email: action.user.email,
      phone: action.user.phone,
      address: action.user.address,
      weddingDate: action.user.weddingDate,
      weddingLocation: action.user.weddingLocation,
      weddingTime: action.user.weddingTime,
      weddingVenue: action.user.weddingVenue,
      weddingVenueAddress: action.user.weddingVenueAddress,
      img: action.user.img,
      groomName: action.user.groomName,
      brideName: action.user.brideName,
      checklist: action.user.checklist,
      guests: action.user.guests,
    };
    // console.log(action.user);
    // state={...user}
  }
  if (action.type === "ADD_GUEST") {
    //check if guest already exist
    // const existingGuestIndex = state.guests.findIndex(
    //   (guest) => guest.id === action.guest.id
    // );
    // const existingGuest = state.guests[existingGuestIndex];
    // let updatedGuests;
    // if (existingGuest) {
    //     const updatedGuest = {
    //         ...existingGuest,
    //         ...action.guest,
    //     };
    //     updatedGuests = [...state.guests];
    //     updatedGuests[existingGuestIndex] = updatedGuest;
    //     }
    //     else {
    //         updatedGuests = state.guests.concat(action.guest);
    //     }
    //     return {
    //         ...state,
    //         guests: updatedGuests,
    //     };
  }
  if (action.type === "REMOVE_GUEST") {
  }
  if (action.type === "UPDATE_GUEST") {
  }
  if (action.type === "ADD_TABLE") {
  }
  if (action.type === "REMOVE_TABLE") {
  }
  if (action.type === "UPDATE_TABLE") {
  }
  if (action.type === "ADD_SEAT") {
  }
  if (action.type === "REMOVE_SEAT") {
  }
  if (action.type === "UPDATE_SEAT") {
  }
  if (action.type === "REMOVE_CHECKLIST_ITEM") {
  }
  if (action.type === "UPDATE_CHECKLIST") {
    console.log("update checklist");
    console.log("uppdate checklist item");
    const res=updateUserById(state.id,{checklist:action.checklist});

    return {
        id: state.id,
        name: state.name,
        email: state.email,
        phone: state.phone,
        address: state.address,
        weddingDate:state.weddingDate,
        weddingLocation:state.weddingLocation,
        weddingTime: state.weddingTime,
        weddingVenue: state.weddingVenue,
        weddingVenueAddress: state.weddingVenueAddress,
        img: state.img,
        groomName:state.groomName,
        brideName: state.brideName,
        checklist: action.checklist,
        guests: state.guests,
      };
  }
};

function UserProvider(props) {
  const [userState, dispatchUserAction] = React.useReducer(
    userReducer,
    detaultUserState
  );

  // כל הפונקציות שמטריגות רידיוסר

  const setUser = (user) => {
    dispatchUserAction({ type: "SET_USER", user: user });
  };

  const addGuestHandler = (guest) => {
    dispatchUserAction({ type: "ADD_GUEST", guest: guest });
  };

  const removeGuestHandler = (guestId) => {
    dispatchUserAction({ type: "REMOVE_GUEST", guestId: guestId });
  };

  const updateGuestHandler = (guestId, updatedGuest) => {
    dispatchUserAction({
      type: "UPDATE_GUEST",
      guestId: guestId,
      updatedGuest: updatedGuest,
    });
  };

  const addTableHandler = (table) => {
    dispatchUserAction({ type: "ADD_TABLE", table: table });
  };

  const removeTableHandler = (tableId) => {
    dispatchUserAction({ type: "REMOVE_TABLE", tableId: tableId });
  };

  const updateTableHandler = (tableId, updatedTable) => {
    dispatchUserAction({
      type: "UPDATE_TABLE",
      tableId: tableId,
      updatedTable: updatedTable,
    });
  };

  const addSeatHandler = (seat) => {
    dispatchUserAction({ type: "ADD_SEAT", seat: seat });
  };

  const removeSeatHandler = (seatId) => {
    dispatchUserAction({ type: "REMOVE_SEAT", seatId: seatId });
  };

  const updateSeatHandler = (seatId, updatedSeat) => {
    dispatchUserAction({
      type: "UPDATE_SEAT",
      seatId: seatId,
      updatedSeat: updatedSeat,
    });
  };

  const deleteChecklistHandler = (checklistItemId) => {
    dispatchUserAction({
      type: "REMOVE_CHECKLIST_ITEM",
      checklistItemId: checklistItemId,
    });
  };

  const updateChecklistHandler = (
    checklist
  ) => {
    dispatchUserAction({
      type: "UPDATE_CHECKLIST",
      checklist: checklist,
    });
  };

  // כל הפונקציות שיצרתי וקוראות לרדיוסר יכולות להיות זמינות לכל הקומפוננטות של האפליקציה
  const userContext = {
    id : userState.id,
    name: userState.name,
    email: userState.email,
    phone: userState.phone,
    address: userState.address,
    weddingDate: userState.weddingDate,
    weddingLocation: userState.weddingLocation,
    weddingTime: userState.weddingTime,
    weddingVenue: userState.weddingVenue,
    img: userState.img,
    weddingVenueAddress: userState.weddingVenueAddress,
    groomName: userState.groomName,
    brideName: userState.brideName,
    checklist: userState.checklist,
    guests: userState.guests,
    setUser: setUser,
    addGuest: addGuestHandler,
    removeGuest: removeGuestHandler,
    updateGuest: updateGuestHandler,
    addTable: addTableHandler,
    removeTable: removeTableHandler,
    updateTable: updateTableHandler,
    addSeat: addSeatHandler,
    removeSeat: removeSeatHandler,
    updateSeat: updateSeatHandler,
   deleteChecklist: deleteChecklistHandler,
    updateChecklist: updateChecklistHandler,
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider;

import React,{useEffect} from "react";
import UserContext from "./user-context";
import {updateUser, addGuestToUser,getUser,updateUserGuest} from "../ServerApi/userApi";
// import { debounce } from "lodash";

function UserProvider(props) {
  const [user, setUser] = React.useState({ 
    _id : "1" ,
    name: "",
    email: "",
    phone:  "",
    address:  "",
    weddingDate:  "",
    weddingLocation: "",
    weddingTime:  "",
    weddingVenue: "",
    img:  "",
    weddingVenueAddress:  "",
    groomName: "",
    brideName: "",
    checklist:  [],
    guests: []
  });

  async function updateChecklist(checklist){
    const res=await updateUser(user._id,{checklist});
    if(res.status===200){
      setUser({...user,checklist});
    }
   
  }

  async function addGuest(guest){
    const res=await addGuestToUser(user._id,{guest});
    if(res.status===200){
      setUser({...user,guests:[...user.guests,guest]});
    }
  }

  async function updateGuests(guests,body){
    const updatedGuests = await Promise.all(
      guests.map(async (guestId) => {
        const res = await updateUserGuest(user._id, guestId,body);
        if (res.status === 200) {
          const updatedGuest = user.guests.find((guest) => guest._id === guestId);
          return {
            ...updatedGuest,
            invitation: true
          };
        }
        return null; // Failed to update, return null or handle error as needed
      })
    );
  
    // Replace the old guests with the updated ones
    const finalGuests = user.guests.map((guest) => {
      const updatedGuest = updatedGuests.find((updated) => updated && updated._id === guest._id);
      return updatedGuest ? updatedGuest : guest;
    });
  
    setUser({ ...user, guests: finalGuests });
  }


  useEffect(()=>{
    async function fetchData(){
      const res= await getUser("6463f4b5954d0fa53015acdd");
      if(res.status===200 ){
        setUser(res.data.user);
      }
    
      
    }
      //TODO init user from server
      
      fetchData()
  },[])
  

  const userContext = {
    user ,
    setUser,
    updateChecklist,
    addGuest,
    updateGuests
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider;

import React,{useEffect} from "react";
import UserContext from "./user-context";
import {updateUser, addGuestToUser,getUser} from "../ServerApi/userApi";
import { debounce } from "lodash";

const updateUserById=async(id,body)=>{
    try{
    const res= await updateUser(id,body);
    return res;
    }catch (err) {
        };
    }



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
    const res=await updateUserById(user._id,{checklist});
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
    addGuest
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider;

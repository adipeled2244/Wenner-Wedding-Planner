import axios from "axios";
const baseUrl = "http://localhost:3500/api";


export const getUser = async (userId) => {
  const res = await axios.get(`${baseUrl}/users/${userId}`);
  return res;
};

export const signup = async (body) => {
  const res = await axios.post(`${baseUrl}/auth/signup`,body);
  return res;
};

export const login = async (body) => {
  return await axios.post(`${baseUrl}/auth/login`,body);
   
};

export const generateSeats=async(userId)=>{
  const res = await axios.patch(`${baseUrl}/users/${userId}/guests/tables`, {},
  {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });
    return res;
  };

export const updateUser = async (userId, body) => {
  
  const res = await axios.patch(`${baseUrl}/users/${userId}`, body,
  {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });
    return res;
  };


  export const addGuestToUser = async (userId, body) => {

    const res = await axios.post(`${baseUrl}/users/${userId}/guests`, body,{
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    } );
    return res;
  };


  export const addTableToUser = async (userId, body) => {
    const res = await axios.post(`${baseUrl}/users/${userId}/tables`, body,{
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    } );
    return res;
  };
  

  export const updateUserGuest = async (userId,guestId, body) => {
    const res =  await axios.patch(`${baseUrl}/users/${userId}/guests/${guestId}`, body , {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    return res;
  };

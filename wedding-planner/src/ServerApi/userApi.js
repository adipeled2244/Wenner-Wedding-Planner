import axios from "axios";
const baseUrl = "http://localhost:3500/api";

export const getUser = async (userId) => {
  const res = await axios.get(`${baseUrl}/users/${userId}`);
  return res;
};


export const updateUser = async (userId, body) => {
  const res = await axios.patch(`${baseUrl}/users/${userId}`, body);
    return res;
  };


  export const addGuestToUser = async (userId, body) => {
    const res = await axios.post(`${baseUrl}/users/${userId}/guests`, body);
    return res;
  };


  export const addTableToUser = async (userId, body) => {
    const res = await axios.post(`${baseUrl}/users/${userId}/tables`, body);
    return res;
  };
  

  export const updateUserGuest = async (userId,guestId, body) => {
    const res =  await axios.patch(`${baseUrl}/users/${userId}/guests/${guestId}`, body);
    return res;
  };

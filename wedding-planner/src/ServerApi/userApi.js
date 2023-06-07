import * as serverApi from "./methods";

export const getUser = async (userId) => {
  const res = await serverApi.get(`/users/${userId}`);
  return res;
};


export const updateUser = async (userId, body) => {
    const res = await serverApi.update(`/users/${userId}`, body);
    return res;
  };


  export const addGuestToUser = async (userId, body) => {
    const res = await serverApi.post(`/users/${userId}/guests`, body);
    console.log(res)
    return res;
  };


  export const addTableToUser = async (userId, body) => {
    console.log(body)
    const res = await serverApi.post(`/users/${userId}/tables`, body);
    console.log(res)
    return res;
  };
  

  export const updateUserGuest = async (userId,guestId, body) => {
    const res = await serverApi.update(`/users/${userId}/guests/${guestId}`, body);
    return res;
  };

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
    const res = await serverApi.post(`/users/${userId}`, body);
    console.log(res)
    return res;
  };

  export const updateUserGuest = async (userId,guestId, body) => {
    const res = await serverApi.update(`/users/${userId}/guests/${guestId}`, body);
    return res;
  };

import * as serverApi from "./methods";

export const getUser = async (userId) => {
  const res = await serverApi.get(`/users/${userId}`);
  return serverApi.handleResult(res, "Get user error");
};


export const updateUser = async (userId, body) => {
    const res = await serverApi.update(`/users/${userId}`, body);
    return serverApi.handleResult(res, "Update user error");
  };
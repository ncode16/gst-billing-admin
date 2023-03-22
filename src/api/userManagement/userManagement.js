import { post, get } from "../../utility/client";

const addUser = (body) => {
  return post("users", body);
};

const deleteUser = (id) => {
  return post(`delete/user/${id}`);
};

const activeUserData = (id, body) => {
  return post(`active-inactive/user/${id}`, body);
};

const getEditUserData = (id) => {
  return get(`edit/user/${id}`)
}

const updateUserData = (id, body) => {
  return post(`update/user/${id}`, body)
}

export { addUser, deleteUser, activeUserData, getEditUserData, updateUserData };

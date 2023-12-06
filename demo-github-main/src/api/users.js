import axios from '../api/request';

export const getAllUsers = () => {
  return axios.get(`/admin/user`);
};
export const deleteUser = (id) => {
  return axios.delete(`/admin/user/${id}`);
};
export const updateUser = (id, userInfo) => {
  return axios.put(`/user/update/${id}`, userInfo);
};

import axios from '../api/request';

export const registerUser = (value) => {
  return axios.post(`/register`, value);
};

export const loginUser = (value) => {
  const res = axios.post(`/login`, value);
  return res;
};

// export const requestRefreshToken = (refreshToken) => {
//   return axios.post(`/refresh`, refreshToken);
// };

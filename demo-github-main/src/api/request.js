import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = "http://localhost:8000/home";
const login_path = "/home/login";

axios.interceptors.request.use((req) => {
  const token = Cookies.get("token");
  const newUrl = baseUrl + req.url;
  const Authorization = login_path === req.url ? undefined : `Bearer ${token}`;

  return {
    ...req,
    url: newUrl,
    headers: {
      ...req.headers,
      Authorization,
    },
  };
});

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;

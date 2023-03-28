import axios from "axios";
// import { messages } from '../constants';
import { getToken } from "../utility/Utils";
import toast from "react-hot-toast";

const client = axios.create({
  baseURL: "http://10.16.16.11:8000/api/",
  headers: {
    "Content-Type": 'application/json' ,
    Accept: "application/json",
  },
});


// const clientFormDatas = axios.create({
//   baseURL: "http://10.16.16.11:8000/api/",
//   headers: {
//     "Content-Type": "form-data",
//     Accept: "application/json",
//   },
// });





const get = (url, body, headers = {}) =>
  client.get(url, { params: body, headers: headers });

const post = (url, body, headers = {}) => client.post(url, body, { headers });
// const formData = (url, body, headers = {}) => client.post(url, body, { headers });

const put = (url, body, headers = {}) => client.put(url, body, { headers });

const patch = (url, body, headers = {}) => client.patch(url, body, { headers });

const del = (url, body, headers = {}) => client.delete(url, body, { headers });

client.interceptors.request.use(async (config) => {
  config.headers.Authorization = await getToken();
  return config;
});

// client.interceptors.response.use(
//   function (response) {
//     if (response?.data && response?.data && response?.data?.data?.logout) {
//       localStorage.removeItem('TOKEN');
//       localStorage.setItem('SHOW_TOAST', true);
//     }

//     return response;
//   },
//   function (error) {
//     if (error?.response?.data?.status === 500) {
//       toast.error(error?.response?.statusText);
//       return Promise.reject(error);
//     } else {
//       return Promise.reject(error);
//     }
//   },
// );

export { get, post, put, del, patch };

export default client;

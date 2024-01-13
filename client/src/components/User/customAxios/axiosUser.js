import axios from 'axios';

const customAxios = axios.create({
  baseURL: 'https://spiritlink02-api.vercel.app/',
});

customAxios.interceptors.request.use(
  (config) => {
    //console.log("2. Custom Axios");
    const token = localStorage.getItem('UserToken');
    //console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default customAxios;

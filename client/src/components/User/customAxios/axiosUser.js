import axios from 'axios';

const customAxios = axios.create({
  baseURL: 'sbusiso/'
});

customAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('UserToken');
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

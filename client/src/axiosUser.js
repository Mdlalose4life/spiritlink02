import axios from 'axios';
const customAxios = axios.create({
    baseURL: "http://localhost:3330",
});

customAxios.interceptors.request.use(
    (config) => {
        const userToken = localStorage.getItem('UserToken');
        if (userToken){
            config.headers.Authorization = `Bearer ${userToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
);

export default customAxios;
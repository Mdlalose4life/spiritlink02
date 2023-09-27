import axios from 'axios';
const instance = axios.create({
    baseURL: "http://localhost:3330",
});
const customAxios = instance;
export default customAxios;
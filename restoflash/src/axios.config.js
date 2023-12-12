import axios from 'axios';

const urlAPI = axios.create({
    baseURL: "http://127.0.0.1:80"
});
export default urlAPI;
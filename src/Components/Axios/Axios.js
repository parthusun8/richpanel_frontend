import axios from "axios";

const instance = axios.create({
    // baseURL : 'https://richpanel-backend.onrender.com/'
    baseURL: "http://localhost:3000/"
});

export default instance;

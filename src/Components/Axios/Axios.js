import axios from "axios";

const instance = axios.create({
    // baseURL: "https://everidoorbackend.com/", //The API {Cloud Funtion}
    baseURL : 'https://richpanel-backend.onrender.com/'
    // baseURL: "http://ec2-43-204-23-143.ap-south-1.compute.amazonaws.com:4000/"
});

export default instance;

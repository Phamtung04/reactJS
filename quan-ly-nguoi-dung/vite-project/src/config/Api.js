import axios from "axios";


export const URL_API  = "https://dummyjson.com";

const jwt = localStorage.getItem("jwt");


const axiosClient = axios.create({
    baseURL: URL_API,
    timeout: 5000, // default is `0` (no timeout)
    responseType: 'json',
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
    }
});


export default axiosClient;
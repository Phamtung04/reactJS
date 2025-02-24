import axios from "axios";


export const URL_API  = "https://67b2f907bc0165def8cf5f10.mockapi.io/api/v1";

const jwt = localStorage.getItem("jwt");


const axiosClient = axios.create({
    baseURL: URL_API,
    timeout: 5000, 
    responseType: 'json',
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
    }
});


export default axiosClient;
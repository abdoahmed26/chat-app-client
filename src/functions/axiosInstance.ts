import axios from "axios";

const apiUrl = import.meta.env.VITE_BACEND_API
export const axiosInstance = axios.create({
    baseURL:`${apiUrl}/api/v1`,
    withCredentials:true
})
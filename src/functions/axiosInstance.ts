import axios from "axios";
import Cookie from "cookie-universal"

const apiUrl = import.meta.env.VITE_BACEND_API
export const axiosInstance = axios.create({
    baseURL:`${apiUrl}/api/v1`,
    withCredentials:true,
    // maxRedirects: 0,
})

export const cookie = Cookie()
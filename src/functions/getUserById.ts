/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "./axiosInstance"
import Cookie from 'cookie-universal';
import { addReceivedUser } from "../store/Slices/ReceivedUserSlice";
import toast from "react-hot-toast"

export const getUserById = (dispatch:any,id:string | undefined)=>{
    const cookie = Cookie()
    axiosInstance.get(`/user/${id}`,{
        headers:{
            "Authorization": `Bearer ${cookie.get("token")}`,
            "Content-Type":"application/json"
        }
    }).then((res)=>{
        dispatch(addReceivedUser(res.data.data.user))
    }).catch((err)=>{
        toast.error(err.response.data.message)
    })
}
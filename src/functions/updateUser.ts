/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "./axiosInstance"
import Cookie from "cookie-universal"
import { addUser } from "../store/Slices/userSlice";
import toast from "react-hot-toast"

interface dataType {
    name:string | null,
    profile_pic:File | null | undefined
}

export const updateUser = (data:dataType,dispatch:any)=>{
    const cookie = Cookie()
    axiosInstance.put("/user",data,{
        headers:{
            "Authorization": `Bearer ${cookie.get("token")}`,
            "Content-Type":"multipart/form-data"
        }
    })
    .then((res)=>{
        // console.log(res)
        dispatch(addUser(res.data.data.user))
        toast.success("your profile updated successfully")
    }).catch((err)=>{
        // console.log(err)
        toast.error(err.response.data.message)
    })
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigateFunction } from "react-router-dom";
import { axiosInstance } from "./axiosInstance"
import Cookie from 'cookie-universal';
import { addUser, deleteUser } from "../store/Slices/userSlice";

export const getUser = (dispatch:any,myUrl:NavigateFunction)=>{
    const cookie = Cookie()
    axiosInstance.get("/user",{
        headers:{
            "Authorization": `Bearer ${cookie.get("token")}`,
            "Content-Type":"application/json"
        }
    }).then((res)=>{
        dispatch(addUser(res.data.data.user))
    }).catch((err)=>{
        console.log(err)
        cookie.remove("token")
        dispatch(deleteUser())
        myUrl("/login")
    })
}
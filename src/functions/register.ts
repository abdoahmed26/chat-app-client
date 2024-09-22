import { NavigateFunction } from "react-router-dom"
import { axiosInstance } from "./axiosInstance"
import toast from "react-hot-toast"

interface dataType {
    name:string,
    email:string,
    password:string,
    profile_pic:File | null | undefined,
}

export const registerUser = (data:dataType,myUrl:NavigateFunction,setLoading:React.Dispatch<React.SetStateAction<boolean>>)=>{
    axiosInstance.post("/auth/register",data,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }).then(res=>{
        toast.success(res.data.message)
        myUrl("/login")
    }).catch(err=>{
        toast.error(err.response.data.message)
    }).finally(()=>setLoading(false))
}
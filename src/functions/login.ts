import toast from "react-hot-toast"
import { axiosInstance, cookie } from "./axiosInstance"
import { NavigateFunction } from "react-router-dom"

interface dataType {
    email:string,
    password:string,
}

export const login = (data:dataType,myUrl:NavigateFunction,setLoading:React.Dispatch<React.SetStateAction<boolean>>)=>{
    axiosInstance.post("/auth/login",data,{
        headers:{
            'Content-Type':'application/json'
        }
    }).then(res=>{
        // console.log(res)
        cookie.set("token",res.data.data.token,{expires:new Date(Date.now()+24*60*60*1000)})
        toast.success("you logged in successfully")
        myUrl("/home")
    }).catch(err=>{
        toast.error(err.response.data.message)
    }).finally(()=>setLoading(false))
}
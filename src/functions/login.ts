import toast from "react-hot-toast"
import { axiosInstance } from "./axiosInstance"
import { NavigateFunction } from "react-router-dom"
import Cookie from "cookie-universal"

interface dataType {
    email:string,
    password:string,
}

export const login = (data:dataType,myUrl:NavigateFunction,setLoading:React.Dispatch<React.SetStateAction<boolean>>)=>{
    const cookie = Cookie()
    axiosInstance.post("/auth/login",data,{
        headers:{
            'Content-Type':'application/json'
        }
    }).then(res=>{
        // console.log(res)
        cookie.set("token",res.data.data.token)
        toast.success("you logged in successfully")
        myUrl("/home")
    }).catch(err=>{
        toast.error(err.response.data.message)
    }).finally(()=>setLoading(false))
}
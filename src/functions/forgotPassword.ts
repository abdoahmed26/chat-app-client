import { NavigateFunction } from "react-router-dom";
import { axiosInstance } from "./axiosInstance"
import { toast } from 'react-hot-toast';

export const confirmEmail = (data:{email:string},myUrl:NavigateFunction,setLoading:React.Dispatch<React.SetStateAction<boolean>>)=>{
    axiosInstance.post("/password/confirmEmail",{...data},{
        headers : {
            "Content-Type":"application/json"
        }
    }).then(res=>{
        // console.log(res)
        toast.success(res.data.message)
        localStorage.email = data.email
        myUrl("/confirmCode")
    }).catch(err=>{
        toast.error(err.response.data.message)
    }).finally(()=>setLoading(false))
}

export const confirmCode = (data:{email:string,code:string},myUrl:NavigateFunction,setLoading:React.Dispatch<React.SetStateAction<boolean>>)=>{
    axiosInstance.post("/password/confirmCode",{...data},{
        headers : {
            "Content-Type":"application/json"
        }
    }).then(res=>{
        // console.log(res)
        toast.success(res.data.message)
        localStorage.code = data.code
        myUrl("/resetPassword")
    }).catch(err=>{
        toast.error(err.response.data.message)
    }).finally(()=>setLoading(false))
}

export const resetPassword = (data:{email:string,code:string,password:string},myUrl:NavigateFunction,setLoading:React.Dispatch<React.SetStateAction<boolean>>)=>{
    axiosInstance.post("/password/resetPassword",{...data},{
        headers : {
            "Content-Type":"application/json"
        }
    }).then(res=>{
        // console.log(res)
        toast.success(res.data.message)
        myUrl("/login")
    }).catch(err=>{
        toast.error(err.response.data.message)
    }).finally(()=>setLoading(false))
}
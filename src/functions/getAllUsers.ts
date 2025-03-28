import { axiosInstance, cookie } from "./axiosInstance"
import toast from "react-hot-toast"

interface userData{
    _id: string;
    email: string;
    name: string;
    profile_pic: string;
    createAt: string;
    updateAt: string;
}

export const getAllUsers = (setData:React.Dispatch<React.SetStateAction<userData[]>>)=>{
    axiosInstance.get("/user/all",{
        headers:{
            "Authorization": `Bearer ${cookie.get("token")}`,
            "Content-Type":"application/json"
        }
    }).then((res)=>{
        // console.log(res)
        const data = res.data.data.users
        setData([...data])
    }).catch((err)=>{
        toast.error(err.response.data.message)
    })
}
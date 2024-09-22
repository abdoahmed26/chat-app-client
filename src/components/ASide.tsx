/* eslint-disable @typescript-eslint/no-explicit-any */
import { AiFillMessage } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { FaUserPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";
import Cookie from "cookie-universal"
import { deleteUser } from "../store/Slices/userSlice";
// import ShowAndEditUser from "./ShowAndEditUser"
// import { useState } from "react"

// interface userData{
//     _id: string;
//     email: string;
//     name: string;
//     profile_pic: string;
//     createAt: string;
//     updateAt: string;
// }

const ASide = ({setLeft,setDisplay,setDisplaySearch}:{setLeft:React.Dispatch<React.SetStateAction<string>>,setDisplay:React.Dispatch<React.SetStateAction<string>>,setDisplaySearch: React.Dispatch<React.SetStateAction<string>>}) => {
    const user:any = useSelector((state:RootState)=>state.user)
    const myUrl = useNavigate()
    const cookie = Cookie()
    const disptach = useAppDispatch()
    const logOut = ()=>{
        cookie.remove("token")
        disptach(deleteUser())
        myUrl("/login")
    }
    const apiUrl = import.meta.env.VITE_BACEND_API
    return (
        <div className="bg-slate-100 fixed left-0 top-0 py-5 w-12 h-screen">
            <div className="h-full w-full flex flex-col items-center justify-between">
                <div className="w-full flex justify-center flex-col">
                    <p onClick={()=>setLeft(prev=> prev === "left-0" ? "-left-full" : "left-0")} className="w-full flex justify-center py-3 cursor-pointer bg-slate-300">
                        <AiFillMessage size={20} className="text-slate-600 "/>
                    </p>
                    <p onClick={()=>setDisplaySearch("flex")} className="w-full flex justify-center py-3 cursor-pointer hover:bg-slate-300">
                        <FaUserPlus size={20} className="text-slate-600 "/>
                    </p>
                </div>
                <div className="w-full flex justify-center flex-col">
                    <p onClick={()=>setDisplay("flex")} className="w-full flex justify-center py-3 cursor-pointer hover:bg-slate-300">
                        <img src={`${apiUrl}/${user.profile_pic}`} className="w-8 h-8 rounded-full" alt="" />
                    </p>
                    <p onClick={()=>logOut()} className="w-full flex justify-center py-3 cursor-pointer hover:bg-slate-300">
                        <CiLogout size={20} className="text-slate-900 "/>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ASide;
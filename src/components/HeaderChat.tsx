/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../store/store";
import { deleteReceivedUser } from "../store/Slices/ReceivedUserSlice";
import { Socket } from "socket.io-client";
import { useEffect, useState } from "react";

const HeaderChat = ({socket}:{socket:Socket | undefined})=>{
    const receivedUser:any = useSelector((state:RootState)=>state.receivedUser)
    const user:any = useSelector((state:RootState)=>state.user)
    const onlineUsers:any = useSelector((state:RootState)=>state.onlineUsers)
    const apiUrl = import.meta.env.VITE_BACEND_API
    const myUrl = useNavigate()
    const dispatch = useAppDispatch()
    const close = ()=>{
        dispatch(deleteReceivedUser())
        myUrl("/home")
    }
    const [typing, setTyping] = useState(false)
    useEffect(()=>{
        socket?.on("typing",()=>{
            setTyping(true)
        })
        socket?.on("stopTyping",()=>{
            setTimeout(()=>setTyping(false),3000)
        })
    },[socket,user])
    return(
        <div className="bg-white sticky top-0 h-16 flex justify-between items-center px-4">
            <div className="flex items-center gap-3">
                <div>
                    <img src={`${apiUrl}/${receivedUser.profile_pic}`} className="w-10 h-10 rounded-full" alt="" />
                </div>
                <div>
                    <h1 className="font-semibold">{receivedUser.name}</h1>
                    <p className="text-sm text-primary">
                        {
                            typing ? "typing..." 
                            : onlineUsers.includes(receivedUser._id)? "online" : "offline"
                        }
                    </p>
                </div>
            </div>
            <div>
                <IoMdClose size={30} onClick={()=>close()} className="cursor-pointer duration-500 hover:text-primary"/>
            </div>
        </div>
    )
}
export default HeaderChat;
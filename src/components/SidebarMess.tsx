/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { CgArrowTopLeft } from "react-icons/cg";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { RootState } from "../store/store";
import UsersInSidebar from "./UsersInSidebar";

const SidebarMess = ({left,socket}:{left:string,socket:Socket | undefined}) => {
    const user:any = useSelector((state:RootState)=>state.user)
    const [data,setData] = useState<any[]>([])
    useEffect(()=>{
        socket?.emit("give-chats")
        socket?.on("all-chats", (chats) => {
            // console.log(chats)
            setData(chats)
        });
    },[socket]);
    return (
        <div className={`bg-white absolute ${left} z-30 border-r shadow-xl sm:shadow-none duration-500 w-[220px] sm:relative sm:left-0 ml-12 sm:min-w-[250px] py-5 h-screen overflow-auto`}>
            <div className="pb-4 px-3 border-b">
                <h1 className="text-xl text-slate-800 font-bold">Message</h1>
            </div>
            {
                data.length > 0 ?
                <div className="p-3">
                    <div className="flex flex-col">
                        {data.map((chat,index) => {
                            return ( 
                                chat.sender._id === user._id ?
                                <UsersInSidebar key={index} person={chat.receiver} lastMsg={chat.lastMsg} seen={chat.seen} />
                                :<UsersInSidebar key={index} person={chat.sender} lastMsg={chat.lastMsg} seen={chat.seen} />
                        )})}
                    </div>
                </div>
                :<div className="flex justify-center py-5">
                    <div className="flex flex-col items-center">
                        <CgArrowTopLeft size={35} className="text-slate-600" />
                        <p className="text-slate-600 text-center mt-4">Explore users to start a conversation with.</p>
                    </div>
                </div>
            }
        </div>
    );
}

export default SidebarMess;

/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import ASide from "../components/ASide";
import ShowAndEditUser from "../components/ShowAndEditUser";
import { useEffect, useState } from "react";
import { getUser } from "../functions/getUser";
import { useAppDispatch } from "../store/store";
import SidebarMess from "../components/SidebarMess";
import SearchUser from "../components/SearchUser";
import NoSelect from "../components/NoSelect";
import UserChat from "../components/UserChat";
import { Route, Routes } from 'react-router-dom'
import io, { Socket } from "socket.io-client"
import Cookie from "cookie-universal"
import { onlineUsers } from "../store/Slices/onlineUsersSlice";

const Home = () => {
    const myUrl = useNavigate()
    const dispatch = useAppDispatch()
    const apiUrl = import.meta.env.VITE_BACEND_API
    const cookie = Cookie()
    const [socket,setSocket] = useState<Socket>()
    useEffect(()=>{
        getUser(dispatch,myUrl)
        const socketUsers:Socket = io(apiUrl,{
            auth:{
                token : cookie.get("token")
            }
        })
        setSocket(socketUsers)
        socketUsers.on("onlineUsers",(data)=>{
            dispatch(onlineUsers(data))
        })
        
        return ()=>{
            socketUsers.disconnect()
        }
    },[])
    const [left,setLeft] = useState<string>("-left-full")
    const [display,setDisplay] = useState("hidden")
    const [displaySearch,setDisplaySearch] = useState("hidden")
    return (
        <div className="bg-slate-200 flex">
            <ASide setLeft={setLeft} setDisplaySearch={setDisplaySearch} setDisplay={setDisplay}/>
            <SidebarMess socket={socket} left={left}/>
            <div className="w-full ml-12 sm:ml-0 min-h-screen">
                <Routes>
                    <Route path="/" element={<NoSelect />} />
                    <Route path="/chat/:id" element={<UserChat socket={socket}/>} />
                </Routes>
            </div>
            <ShowAndEditUser display={display} setDisplay={setDisplay}/>
            <SearchUser display={displaySearch} setDisplay={setDisplaySearch} />
        </div>
    );
}

export default Home;
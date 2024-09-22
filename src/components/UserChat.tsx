/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom"
import background from "../assets/wallapaper.jpeg"
import HeaderChat from "./HeaderChat"
import { useEffect, useRef, useState } from "react"
import { RootState, useAppDispatch } from "../store/store";
import { getUserById } from "../functions/getUserById"
import SendMessage from "./SendMessage";
import { IoMdClose } from "react-icons/io";
import { Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import moment from "moment";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const UserChat = ({socket}:{socket:Socket | undefined})=>{
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const user:any = useSelector((state:RootState)=>state.user)
    const receivedUser:any = useSelector((state:RootState)=>state.receivedUser)
    const apiUrl = import.meta.env.VITE_BACEND_API
    const [imageUrl,setImageUrl] = useState("")
    const [videoUrl,setVideoUrl] = useState("")
    const [loading,setLoading] = useState(false)
    const [messages,setMessages] = useState<any[]>([])
    const currentMessage:any = useRef(null)
    useEffect(()=>{
        if(currentMessage.current){
            currentMessage.current.scrollIntoView({ behavior: "smooth", block : 'end' });
        }
    },[messages])
    // console.log(id)
    useEffect(()=>{
        getUserById(dispatch,id)
    },[id,dispatch])
    useEffect(()=>{
        socket?.on("allMessage",(data)=>{
            // console.log(data)
            setMessages([...data])
        })
    },[socket])
    useEffect(()=>{
        socket?.emit("seen",id)
        socket?.emit("give-me-messags",id)
        socket?.on("take-messages",(data)=>{
            // console.log(data)
            // data ? setMessages([...data]) : setMessages([])
            if(data){
                setMessages([...data])
            }
            else{
                setMessages([])
            }
        })
    },[socket,id])
    return(
        <div style={{backgroundImage:`url(${background})`}} className="h-screen z-10 bg-no-repeat bg-cover">
            <div>
                <HeaderChat socket={socket}/>
            </div>
            <div className="bg-slate-200 relative h-[calc(100vh-128px)] overflow-y-auto bg-opacity-50">
                <div className="" ref={currentMessage}>
                {
                    messages.map((msg,index)=>
                        <div className={`my-3 flex gap-2 ${user._id === msg.sendBy ? "justify-start ml-3" : "justify-start flex-row-reverse mr-3"}`} key={index}>
                            <div>
                                <img src={user._id === msg.sendBy ? `${apiUrl}/${user.profile_pic}` : `${apiUrl}/${receivedUser.profile_pic}`} className="w-7 h-7 rounded-full" alt="" />
                            </div>
                            <div className={`w-fit p-1 px-3 rounded-md ${user._id === msg.sendBy ? "bg-teal-100" : "bg-white"} `} >
                                <div>
                                    
                                    {
                                        msg.imageUrl && 
                                        <div className="w-[220px] h-[220px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px]">
                                            <img src={msg.imageUrl} alt="" className="w-full h-full rounded-md object-cover" />
                                        </div>
                                    }
                                    {
                                        msg.videoUrl && 
                                        <div className="w-[220px] h-[220px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px]">
                                            <video controls src={msg.videoUrl} className="w-full h-full object-cover" />
                                        </div>
                                    }
                                </div>
                                <p className="">{msg.text}</p>
                                <div className={`flex ${user._id === msg.sendBy ? "justify-end items-center gap-1" : "text-start" }`}>
                                    <p className={`text-xs ${user._id === msg.sendBy ? "text-end" : "text-start" } `}>{moment(msg.createdAt).format("hh:mm")}</p>
                                    {user._id === msg.sendBy && <p className={`text-lg ${msg.seen ? "text-blue-500" : "text-gray-500"} flex`}><IoCheckmarkDoneSharp /></p>}
                                </div>
                            </div>
                        </div>
                    )
                }
                </div>
                {
                    loading && 
                        <div className="flex sticky bottom-0 justify-center items-center h-full">
                            <span className="w-8 h-8 inline-block rounded-full border-2 border-black border-l-primary animate-spin"></span>
                        </div>
                }
                {
                    imageUrl && <div className="bg-slate-700 sticky bottom-0 container bg-opacity-50 flex justify-center items-center h-full">
                        <div className="absolute top-2 right-3">
                            <IoMdClose size={30} onClick={()=>setImageUrl("")} className="cursor-pointer duration-500 hover:text-primary"/>
                        </div>
                        <img src={imageUrl} alt="" className="w-[300px] h-[300px] object-cover" />
                    </div>
                }
                {
                    videoUrl && <div className="bg-slate-700 sticky bottom-0 container bg-opacity-50 flex justify-center items-center h-full">
                        <div className="absolute top-2 right-3">
                            <IoMdClose size={30} onClick={()=>setVideoUrl("")} className="cursor-pointer duration-500 hover:text-primary"/>
                        </div>
                        <video src={videoUrl} controls autoPlay muted className="w-[300px] h-[300px] object-cover" />
                    </div>
                }
                
            </div>
            <div>
                <SendMessage socket={socket} imageUrl={imageUrl} videoUrl={videoUrl} setImageUrl={setImageUrl} setVideoUrl={setVideoUrl} setLoading={setLoading} />
            </div>
        </div>
    )
}
export default UserChat;
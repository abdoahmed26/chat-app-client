/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { FaImage, FaPlus, FaVideo } from "react-icons/fa";
import { uploadFile } from "../functions/uploadFile";
import { IoMdSend } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Socket } from "socket.io-client";

const SendMessage = ({socket,imageUrl,videoUrl,setImageUrl,setVideoUrl,setLoading}:{socket:Socket | undefined,imageUrl:string,videoUrl:string,setImageUrl: React.Dispatch<React.SetStateAction<string>>,setVideoUrl:React.Dispatch<React.SetStateAction<string>>,setLoading:React.Dispatch<React.SetStateAction<boolean>>}) => {
    const [open,setOpen] = useState("hidden")
    const user:any = useSelector((state:RootState)=>state.user)
    const ReceivedUser:any = useSelector((state:RootState)=>state.receivedUser)
    const [message,setMessage] = useState({
        text:"",
        imageUrl:imageUrl,
        videoUrl:videoUrl,
    })
    const handleSubmitPhoto = async(e:React.ChangeEvent<HTMLInputElement>)=>{
        setLoading(true)
        const Url = await uploadFile(e.target.files?.item(0))
        // console.log("imageUrl",Url)
        setImageUrl(Url)
        setLoading(false)
    }
    const handleSubmitVideo = async(e:React.ChangeEvent<HTMLInputElement>)=>{
        setLoading(true)
        const videoUrl = await uploadFile(e.target.files?.item(0))
        // console.log("videoUrl",videoUrl)
        setVideoUrl(videoUrl)
        setLoading(false)
    }
    const handleText = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setMessage({...message,text: e.target.value})
    }
    const sendMessage = (e:React.FormEvent<HTMLFormElement>)=>{
        // console.log("message",message)
        e.preventDefault()
        socket?.emit("new-message", {
            sender: user._id,
            receiver: ReceivedUser._id,
            text: message.text,
            imageUrl: message.imageUrl,
            videoUrl: message.videoUrl,
        })
        // send message to server
        setImageUrl("")
        setVideoUrl("")
        setMessage((prev)=>({...prev,text:""}))
    }
    useEffect(()=>{
        setMessage(prev=>({...prev,imageUrl}))
    },[imageUrl])
    useEffect(()=>{
        setMessage(prev=>({...prev,videoUrl}))
    },[videoUrl])
    return (
        <div className="h-16 bg-white px-4 flex gap-3 items-center relative">
            <div className="">
                <div onClick={()=>setOpen(open === "hidden" ? "block" : "hidden")} className=" w-12 h-12 duration-300 hover:bg-primary hover:text-white rounded-full cursor-pointer flex items-center justify-center">
                    <FaPlus size={20} className="font-light"/>
                </div>
                <div className={`absolute ${open} -top-28 rounded-md bg-white w-40 shadow-lg p-2`}>
                    <form action="">
                        <label htmlFor="image" className="flex cursor-pointer hover:bg-slate-200 rounded duration-300 items-center gap-3 p-2">
                            <div>
                                <FaImage size={20} className="text-primary" />
                            </div>
                            <p>Image</p>
                        </label>
                        <label htmlFor="video" className="flex hover:bg-slate-200 rounded duration-300 p-2 cursor-pointer items-center gap-3">
                            <div>
                                <FaVideo size={20} className="text-purple-600" />
                            </div>
                            <p>Video</p>
                        </label>
                        <input type="file" onChange={handleSubmitPhoto} name="image" id="image" className="hidden" />
                        <input type="file" onChange={handleSubmitVideo} name="video" id="video" className="hidden" />
                    </form>
                </div>
            </div>
            <form onSubmit={sendMessage} className="w-full h-full flex">
                <div className="w-full h-full">
                    <input type="text" value={message.text} onChange={handleText} onKeyDown={()=>socket?.emit("typing",ReceivedUser._id)} onKeyUp={()=>socket?.emit("stopTyping",ReceivedUser._id)} name="text" id="text" placeholder="Type here message.." className="outline-none h-full w-full" />
                </div>
                <div className="flex items-center">
                    <button disabled={!message.text && !message.imageUrl && !message.videoUrl}>
                        <IoMdSend size={25} className="text-primary hover:text-secondary"/>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SendMessage;

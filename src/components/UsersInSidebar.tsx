/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { FaImage, FaVideo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface userData{
    _id: string;
    email: string;
    name: string;
    profile_pic: string;
}

const UsersInSidebar = ({person,lastMsg,seen}:{person:userData,lastMsg:any,seen:number}) => {
    const onlineUsers:any = useSelector((state:RootState)=>state.onlineUsers)
    const myUrl = useNavigate()
    const apiUrl = import.meta.env.VITE_BACEND_API
    return (
        <div onClick={()=>myUrl(`/home/chat/${person._id}`)} className="flex border-b items-center gap-2 hover:bg-slate-200 p-2 rounded-md cursor-pointer">
            <div className="relative w-12 h-10">
                <img src={`${apiUrl}/${person.profile_pic}`} alt="" className="w-full h-full block rounded-full" />
                {
                    onlineUsers.includes(person._id) &&
                        <span className="w-2 h-2 absolute top-0 right-0 inline-block bg-green-600 rounded-full"></span>
                }
            </div>
            <div className="flex w-full justify-between items-center">
                <div>
                    <p className="font-medium m-0 text-slate-800">{person.name}</p>
                    <div className="flex items-center gap-1">
                        {
                            lastMsg.imageUrl && <FaImage size={16} className="text-primary" />
                        }
                        {
                            lastMsg.videoUrl && <FaVideo size={16} className="text-purple-600" />
                        }
                        <p className="text-sm m-0 font-medium text-slate-500">{lastMsg.text.slice(0,10)}...</p>
                    </div>
                </div>
                {
                    seen > 0 && 
                    <p className="bg-primary w-6 flex justify-center items-center h-6 rounded-full text-white">{seen}</p>
                }
            </div>
        </div>
    );
}

export default UsersInSidebar;
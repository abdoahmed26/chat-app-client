/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState , useEffect} from "react"
import {getAllUsers} from "../functions/getAllUsers"
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom"
import { IoMdClose } from "react-icons/io";

interface userData{
    _id: string;
    email: string;
    name: string;
    profile_pic: string;
    createAt: string;
    updateAt: string;
}

const SearchUser = ({display,setDisplay}:{display:string,setDisplay: React.Dispatch<React.SetStateAction<string>>})=>{
    const myUser:any = useSelector((state:RootState)=>state.user)
    const onlineUsers:any = useSelector((state:RootState)=>state.onlineUsers)
    const [data,setData] = useState<userData[]>([])
    const [search,setSearch] = useState("")
    const myUrl = useNavigate()
    useEffect(()=>{
        getAllUsers(setData)
    },[])
    const apiUrl = import.meta.env.VITE_BACEND_API
    const goToChat = (id:string)=>{
        setDisplay("hidden")
        myUrl(`/home/chat/${id}`)
    }
    return(
        <div className={`${display} inset-0 z-40 fixed left-0 top-0 bottom-0 right-0 justify-center items-center w-full h-full bg-slate-700 bg-opacity-40`}>
            <div className="absolute top-5 right-5">
                <IoMdClose size={30} onClick={()=>setDisplay("hidden")} className="cursor-pointer duration-500 hover:text-white"/>
            </div>
            <div className="container flex justify-center">
                <div className="bg-white p-4 px-3 w-[400px] rounded">
                    <div>
                        <input type="search" onChange={(e)=>setSearch(e.target.value)} placeholder="Search user by name" className="w-full h-8 mt-1 rounded-md focus:border-[2px] focus:border-primary p-2 outline-none bg-slate-200 "/>
                    </div>
                    <div className="my-3 h-[70vh] overflow-auto">
                        {
                            data.map((user:userData,index)=>{
                                return( user.name.includes(search) && user._id !== myUser._id ?
                                    <div onClick={()=>goToChat(user._id)} className="p-3 cursor-pointer duration-500 hover:border hover:border-primary rounded flex items-center gap-3 border-b" key={index}>
                                        <div className="relative">
                                            <img src={`${apiUrl}/${user.profile_pic}`} className="w-10 h-10 rounded-full" alt="" />
                                            {
                                                onlineUsers.includes(user._id) &&
                                                <span className="w-2 h-2 absolute top-0 right-0 inline-block bg-green-600 rounded-full"></span>
                                            }
                                        </div>
                                        <div>
                                            <h1 className="font-semibold">{user.name}</h1>
                                            <p className="text-sm">{user.email}</p>
                                        </div>
                                    </div>
                                    :null
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SearchUser;
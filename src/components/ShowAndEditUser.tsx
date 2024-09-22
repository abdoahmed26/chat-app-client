/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useAppDispatch } from "../store/store";
import { updateUser } from "../functions/updateUser";

interface dataType {
    name:string | null,
    profile_pic:File | null | undefined
}

const ShowAndEditUser = ({display,setDisplay}:{display:string,setDisplay:React.Dispatch<React.SetStateAction<string>>})=>{
    const user:any = useSelector((state:RootState)=>state.user)
    const apiUrl = import.meta.env.VITE_BACEND_API
    const [data,setData] = useState<dataType>({
        name:null,
        profile_pic:null,
    })
    const dispatch = useAppDispatch()
    const onSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        // console.log(data)
        updateUser(data,dispatch)
    }
    return(
        <div className={`${display} inset-0 z-40 fixed left-0 top-0 bottom-0 right-0 justify-center items-center w-full h-full bg-slate-700 bg-opacity-40`}>
            <div className="container relative flex justify-center">
                <div className="bg-white p-4 px-3 w-[350px] rounded">
                    <h1 className="font-semibold">Profile Details</h1>
                    <p className="text-sm">Edit user details</p>
                    <form className="mt-3" onSubmit={(e)=>onSubmit(e)}>
                        <div>
                            <label htmlFor="name">Name :</label><br/>
                            <input type="text" defaultValue={user.name} onChange={(e)=>setData({...data,name:e.target.value})} name="name" id="name" className="w-full h-8 mt-1 rounded-md focus:border-[2px] focus:border-primary p-2 outline-none bg-slate-200 "/>
                        </div>
                        <div className="mt-3 pb-3 border-b">
                            <label>Photo :</label><br/>
                            <div className="mt-1 flex items-center gap-5">
                                <img src={data.profile_pic ? URL.createObjectURL(data.profile_pic) : `${apiUrl}/${user.profile_pic}`} className="w-8 h-8 rounded-full" alt="" />
                                <label htmlFor="photo" className="font-semibold cursor-pointer">Change Photo</label><br/>
                                <input type="file" onChange={(e)=>setData({...data,profile_pic:e.target.files?.item(0)})} name="profile_pic" id="photo" className="hidden" />
                            </div>
                        </div>
                        <div className="pt-4 flex justify-end gap-2">
                            <button onClick={()=>setDisplay("hidden")} type="button" className="p-1 px-3 bg-white border-[1px] text-primary duration-300 border-primary hover:text-white hover:bg-primary rounded">Cancel</button>
                            <button type="submit" className="p-1 px-3 border-[1px] duration-300 border-primary text-white bg-primary hover:bg-secondary rounded">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default ShowAndEditUser;
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../functions/register";
import { useState } from "react";
import Header from "../components/Header";

interface dataType {
    name:string,
    email:string,
    password:string,
}

const Register = () => {
    const {register,handleSubmit,formState:{errors}} = useForm<dataType>()
    const [photo,setPhoto] = useState<File | null>()
    const myUrl = useNavigate()
    const [loading,setLoading] = useState<boolean>(false)
    const onSubmit = (data:dataType) => {
        setLoading(true)
        const allData = {
            ...data,
            profile_pic:photo
        }
        // console.log(allData)
        registerUser(allData,myUrl,setLoading)
    }
    return (
        <div className="bg-slate-200 min-h-screen">
            <Header />
            <div className="flex py-5 justify-center items-center min-h-[calc(100vh-120px)]">
                <div className="container flex justify-center">
                    <div className="w-[450px] bg-white p-3 rounded-md px-4">
                        <p>Welcome to Chat app!</p>
                        <div className="mt-3">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <label htmlFor="name">Name : </label><br />
                                    <input type="text" {...register("name",{required:true})} id="name" name="name" placeholder="Enter your name" className="w-full h-8 mt-1 rounded-md focus:border-[2px] focus:border-primary p-2 outline-none bg-slate-200 " />
                                    {errors.name?.type ==="required" && <p className="text-red-500">Name is required</p>}
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="email">Email : </label><br />
                                    <input type="email" {...register("email",{required:true})} id="email" name="email" placeholder="Enter your email" className="w-full h-8 mt-1 rounded-md focus:border-[2px] focus:border-primary p-2 outline-none bg-slate-200 " />
                                    {errors.email?.type ==="required" && <p className="text-red-500 text-sm">Email is required</p>}
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="password">Password : </label><br />
                                    <input type="password" {...register("password",{required:true})} id="password" name="password" placeholder="Enter your password" className="w-full h-8 mt-1 rounded-md focus:border-[2px] focus:border-primary p-2 outline-none bg-slate-200 " />
                                    {errors.password?.type ==="required" && <p className="text-red-500 text-sm">Password is required</p>}
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="photo">Photo : </label><br />
                                    <label htmlFor="photo" className="w-full cursor-pointer h-14 flex justify-center items-center mt-1 rounded-md focus:border-[2px] focus:border-primary p-2 outline-none bg-slate-200 text-sm">
                                        <span>
                                            {
                                                photo ?
                                                    <span>{photo.name}</span>
                                                :
                                                <span>Upload profile photo</span>
                                            }
                                        </span>
                                    </label>
                                    <input type="file" onChange={(e)=>setPhoto(e.target.files?.item(0))} id="photo" name="profile_pic" placeholder="Enter your photo" className="w-full hidden h-8 mt-1 rounded-md focus:border-[2px] focus:border-primary p-2 outline-none bg-slate-200 " />
                                </div>
                                <button disabled={loading} className="w-full text-white mt-4 rounded-md bg-primary p-2 outline-none ">
                                    {
                                        loading ?
                                        <span className="inline-block w-5 h-5 rounded-full border-[2px] border-black border-l-gray-500 animate-spin"></span>
                                        :"Register"
                                    }
                                </button>
                            </form>
                        </div>
                        <div className="mt-3 flex justify-center">
                            <p>Already have account ? <Link to={"/login"} className="font-bold hover:text-primary duration-300">Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;

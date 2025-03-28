/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { login } from "../functions/login";
import Header from "../components/Header";
import LoginWithGoogle from "../components/LoginWithGoogle";
import LoginWithGithub from "../components/LoginWithGithub";
import { cookie } from "../functions/axiosInstance";

interface dataType {
    email:string,
    password:string,
}

const Login = () => {
    const {register,handleSubmit,formState:{errors}} = useForm<dataType>()
    const myUrl = useNavigate()
    const [loading,setLoading] = useState<boolean>(false)
    const [search,_setSearch] = useSearchParams()
    const onSubmit = (data:dataType) => {
        setLoading(true)
        // console.log(data)
        login(data,myUrl,setLoading)
    }
    useEffect(()=>{
        if(search.get("token")){
            cookie.set("token",search.get("token")!,{expires:new Date(Date.now()+24*60*60*1000)})
            myUrl("/home")
        }
    },[search,myUrl])
    return (
        <div className="min-h-screen bg-slate-200">
            <Header />
            <div className="flex my-5 justify-center items-center min-h-[calc(100vh-120px)]">
                <div className="container flex justify-center">
                    <div className="w-[450px] bg-white p-3 rounded-md px-4">
                        <p>Welcome to Chat app!</p>
                        <div className="flex items-center justify-center gap-3">
                            <LoginWithGoogle />
                            <LoginWithGithub />
                        </div>
                        <div className="mt-3">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mt-3">
                                    <label htmlFor="email">Email : </label><br />
                                    <input type="email" {...register("email",{required:true})} id="email" name="email" placeholder="Enter your email" className="w-full h-8 mt-1 rounded-md focus:border-[2px] focus:border-primary p-2 outline-none bg-slate-200 " />
                                    {errors.email?.type ==="required" && <p className="text-sm text-red-500">Email is required</p>}
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="password">Password : </label><br />
                                    <input type="password" {...register("password",{required:true})} id="password" name="password" placeholder="Enter your password" className="w-full h-8 mt-1 rounded-md focus:border-[2px] focus:border-primary p-2 outline-none bg-slate-200 " />
                                    {errors.password?.type ==="required" && <p className="text-sm text-red-500">Password is required</p>}
                                </div>
                                <button disabled={loading} className="w-full p-2 mt-4 text-white rounded-md outline-none bg-primary ">
                                    {
                                        loading ?
                                        <span className="inline-block w-5 h-5 rounded-full border-[2px] border-black border-l-gray-500 animate-spin"></span>
                                        :"Let's Go"
                                    }
                                </button>
                            </form>
                        </div>
                        <div className="flex justify-between mt-3">
                            <Link to="/confirmEmail" className="font-semibold duration-300 hover:text-primary">Forgot Password ?</Link>
                            <p>New User ? <Link to={"/register"} className="font-bold duration-300 hover:text-primary">Register</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

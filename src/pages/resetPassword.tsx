import { useForm } from "react-hook-form"
import Header from "../components/Header"
import { resetPassword } from "../functions/forgotPassword"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface dataType{
    password:string
}
const ResetPassword = () => {
    const {register,handleSubmit,formState:{errors}} = useForm<dataType>()
    const myUrl = useNavigate()
    const [loading,setLoading] = useState<boolean>(false)
    const onSubmit = (data:dataType) => {
        setLoading(true) 
        const allData = {
            email: localStorage.email,
            code: localStorage.code,
            password: data.password
        }
        // console.log(allData)
        resetPassword(allData,myUrl,setLoading)
    }
    return (
        <div className="bg-slate-200 min-h-screen">
            <Header />
            <div className="flex my-5 justify-center items-center min-h-[calc(100vh-120px)]">
                <div className="container flex justify-center">
                    <div className="w-[450px] bg-white p-3 rounded-md px-4">
                        <p>Welcome to Chat app!</p>
                        <div className="mt-3">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mt-3">
                                    <label htmlFor="password">Password : </label><br />
                                    <input type="password" {...register("password",{required:true})} id="password" name="password" placeholder="Enter your new password" className="w-full h-8 mt-1 rounded-md focus:border-[2px] focus:border-primary p-2 outline-none bg-slate-200 " />
                                    {errors.password?.type ==="required" && <p className="text-red-500 text-sm">Password is required</p>}
                                </div>
                                <button disabled={loading} className="w-full text-white mt-4 rounded-md bg-primary p-2 outline-none ">
                                    {
                                        loading ?
                                        <span className="inline-block w-5 h-5 rounded-full border-[2px] border-black border-l-gray-500 animate-spin"></span>
                                        :"Submit"
                                    }
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;

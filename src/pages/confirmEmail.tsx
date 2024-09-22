import { useState } from "react"
import Header from "../components/Header"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { confirmEmail } from "../functions/forgotPassword"

interface dataType {
    email:string,
}

const ConfirmEmail = () => {
    const {register,handleSubmit,formState:{errors}} = useForm<dataType>()
    const myUrl = useNavigate()
    const [loading,setLoading] = useState<boolean>(false)
    const onSubmit = (data:dataType) => {
        setLoading(true)
        // console.log(data)
        confirmEmail(data,myUrl,setLoading)
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
                                    <label htmlFor="email">Email : </label><br />
                                    <input type="email" {...register("email",{required:true})} id="email" name="email" placeholder="Enter your email" className="w-full h-8 mt-1 rounded-md focus:border-[2px] focus:border-primary p-2 outline-none bg-slate-200 " />
                                    {errors.email?.type ==="required" && <p className="text-red-500 text-sm">Email is required</p>}
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

export default ConfirmEmail;

import logo from "../assets/logo.png"

const NoSelect = ()=>{
    return(
        <div className="flex justify-center items-center w-full min-h-screen">
            <div className=" ">
                <img src={logo} alt="log" className="w-40 h-16" />
                <p className="text-slate-600 mt-4">Select user to send message</p>
            </div>
        </div>
    )
}
export default NoSelect
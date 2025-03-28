import { Navigate, Outlet } from "react-router-dom";
import { cookie } from "../functions/axiosInstance";

const GlobalPages = () => {
    return (
        cookie.get("token") ? <Navigate to="/home" /> : <Outlet />
    );
}

export default GlobalPages;
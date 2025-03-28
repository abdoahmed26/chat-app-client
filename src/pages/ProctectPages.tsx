import { Navigate, Outlet } from "react-router-dom";
import { cookie } from "../functions/axiosInstance";

const ProctectPages = () => {
    return (
        cookie.get("token") ? <Outlet /> : <Navigate to="/login" />
    );
}

export default ProctectPages;

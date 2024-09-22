import Cookie from "cookie-universal"
import { Navigate, Outlet } from "react-router-dom";

const ProctectPages = () => {
    const cookie = Cookie()
    return (
        cookie.get("token") ? <Outlet /> : <Navigate to="/login" />
    );
}

export default ProctectPages;

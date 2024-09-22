import Cookie from "cookie-universal"
import { Navigate, Outlet } from "react-router-dom";

const GlobalPages = () => {
    const cookie = Cookie()
    return (
        cookie.get("token") ? <Navigate to="/home" /> : <Outlet />
    );
}

export default GlobalPages;
import { Link } from "react-router-dom";
import googleLogo from "../assets/google-icon.png"

const LoginWithGoogle = () => {
    return (
        <div className="mt-3">
            <Link to={`${import.meta.env.VITE_BACEND_API}/api/v1/auth/google`} 
            className="p-2 px-5 text-white duration-300 bg-blue-500 rounded hover:bg-blue-600">
                <img src={googleLogo} alt="google logo" className="inline-block w-5 h-5 mr-2 rounded-full" />
                Google
            </Link>
        </div>
    );
}

export default LoginWithGoogle;

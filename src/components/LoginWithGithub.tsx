import { Link } from "react-router-dom";
import githubLogo from "../assets/github-icon.png"

const LoginWithGithub = () => {
    return (
        <div className="mt-3">
            <Link to={`${import.meta.env.VITE_BACEND_API}/api/v1/auth/github`} 
            className="p-2 px-5 text-white duration-300 bg-green-500 rounded hover:bg-green-600">
                <img src={githubLogo} alt="google logo" className="inline-block w-5 h-5 mr-2 rounded-full" />
                GitHub
            </Link>
        </div>
    );
}

export default LoginWithGithub;

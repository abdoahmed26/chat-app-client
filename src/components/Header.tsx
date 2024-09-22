import logo from "../assets/logo.png"

const Header = () => {
    return (
        <div className="bg-white shadow-lg py-2 flex justify-center">
            <div className="container">
                <div className="flex justify-center">
                    <img src={logo} alt="log" className="w-40 h-16" />
                </div>
            </div>
        </div>
    );
}

export default Header;

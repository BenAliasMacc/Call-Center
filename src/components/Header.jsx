import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import Burgermenu from "./BurgerMenu";
import logoutButton from "../assets/icons/log-out.svg";
import logo from "../assets/images/logoCallDirect.png";

const Header = () => {

    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/login');
    }

    return (
        <header className="header">
            <div className="header__logo"><Link to="/"><img src={logo} alt="retour à l'acceuil" /></Link></div>
            <div className="header__nav">
                <Burgermenu />
                <button className="logout-button" onClick={logout}><img src={logoutButton} alt="déconnexion" /></button>
            </div>
        </header>
    )
}

export default Header
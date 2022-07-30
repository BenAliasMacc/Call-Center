import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logoutButton from "../assets/icons/log-out.svg";
import useAuth from '../hooks/useAuth';

const BurgerMenu = ({ logout }) => {

    const userRole = localStorage.getItem("userRole");
    const [showNav, setShowNav] = useState(false)

    const ROLES = {
        'User': "0",
        'Admin': "1"
    }

    const handleBurgerMenu = () => {
        setShowNav(!showNav)
    }

    const diplayNav = showNav ? "show-navbar" : ""; 

    return (

        <nav className={`burger-menu ${diplayNav}`} style={{zIndex: "100"}}>

            <ul className='header__navbar__list'>
                <li className='header__navbar__list__link'><Link to="/"><p>Accueil</p></Link></li>
                {(userRole === ROLES.Admin) && <>
                    <li className='header__navbar__list__link'><Link to="/new-clients"><p>Ajouter un client</p></Link></li>                
                    <li className='header__navbar__list__link'><Link to="/gestion-users"><p>Gestion des users</p></Link></li>
                </>}
                <li className='header__navbar__list__link'>
                    <button className="logout-button" onClick={logout}><img src={logoutButton} alt="déconnexion" />Déconnexion</button>
                </li>
            </ul>

            <button className="burger-menu__burger-button" onClick={handleBurgerMenu}>
                <span className="burger-menu__burger-button__bar"></span>
            </button>

        </nav>
    )
}

export default BurgerMenu;
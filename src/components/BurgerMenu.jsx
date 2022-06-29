import React, { useState } from 'react'

const BurgerMenu = () => {

    const [showNav, setShowNav] = useState(false)

    const handleBurgerMenu = () => {
        setShowNav(!showNav)
    }

    const diplayNav = showNav ? "show-navbar" : ""; 

    return (

        <button className={`burger-menu ${diplayNav}`} onClick={handleBurgerMenu}>
            <span className="burger-menu__bar"></span>
        </button>
    )
}

export default BurgerMenu
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi';
import { Screen } from './Screen'


export const Header = () => {

    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)



    return (
        <header className="header main-layout">
            <Screen isOpen={isMobileMenuToggled} exitScreen={setIsMobileMenuToggled} />
            <Link to="/"><h3>WeatherCloud</h3></Link>
            <nav className={`${isMobileMenuToggled ? 'mobile-menu-active' : ''} nav-container`}>
                <NavLink exact to="/"><div className="nav-btn-container" onClick={() => { setIsMobileMenuToggled(false) }}> Weather</div></NavLink>
                <NavLink to="/favourites"><div className="nav-btn-container" onClick={() => { setIsMobileMenuToggled(false) }}>Favourites</div></NavLink>
            </nav>
            <GiHamburgerMenu onClick={() => { setIsMobileMenuToggled(true) }} className="mobile-menu-icon" />
        </header>
    )
}

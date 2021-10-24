import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';
import { Screen } from './Screen'
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../store/actions/theme.action';
import Tooltip from '@mui/material/Tooltip';
import { alertMessage } from '../services/alert.service';


export const Header = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)
    const isDarkMode = useSelector(state => state.themeModule.isDarkMode)

    const dispatch = useDispatch()

    const onToggleDarkMode = (boolean) => {
        setIsMobileMenuToggled(false)
        dispatch(toggleDarkMode(boolean))
        alertMessage(`Switched to ${boolean ? 'Dark' : 'Light'} theme`, 'info', 2500)
    }


    return (
        <header className="header main-layout">
            <Screen isOpen={isMobileMenuToggled} exitScreen={setIsMobileMenuToggled} />
            <Link to="/"><h3 className={`${isDarkMode ? 'dark-mode' : ''}`}>WeatherCloud</h3></Link>
            <nav className={`${isMobileMenuToggled ? 'mobile-menu-active' : ''} ${isDarkMode ? 'dark-mode' : ''} nav-container`}>
                {isDarkMode ? (isMobileMenuToggled ?
                    <h4 onClick={() => { onToggleDarkMode(false) }}>Disable dark mode</h4> :
                    <Tooltip type="button" title="Light theme" arrow placement="bottom">
                        <div className="theme-icon-container">
                            <HiOutlineSun className="theme-icon" onClick={() => { onToggleDarkMode(false) }} />
                        </div>
                    </Tooltip>)
                    : (isMobileMenuToggled ?
                        <h4 onClick={() => { onToggleDarkMode(true) }}>Enable dark mode</h4> :
                        <Tooltip type="button" title="Dark theme" arrow placement="bottom">
                            <div className="theme-icon-container">
                                <HiOutlineMoon className="moon-icon theme-icon" onClick={() => { onToggleDarkMode(true) }} />
                            </div>
                        </Tooltip>)}

                <NavLink exact to="/"><div className="nav-btn-container" onClick={() => { setIsMobileMenuToggled(false) }}> Weather</div></NavLink>
                <NavLink to="/favourites"><div className="nav-btn-container" onClick={() => { setIsMobileMenuToggled(false) }}>Favourites</div></NavLink>
            </nav>
            <GiHamburgerMenu onClick={() => { setIsMobileMenuToggled(true) }} className={`${isDarkMode ? 'dark-mode' : ''} mobile-menu-icon`} />
        </header>
    )
}

import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export const Header = () => {
    return (
        <header className="header main-layout">
            <Link to="/"><h3>WeatherCloud</h3></Link>
            <nav className="nav-container">
                <NavLink exact to="/">Weather</NavLink>
                <NavLink to="/favourites">Favourites</NavLink>
            </nav>
        </header>
    )
}

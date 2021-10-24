import React from 'react'
import { useSelector } from 'react-redux'
import { FavouritesList } from '../components/FavouritesList'
import { Header } from '../components/Header'

export const Favourites = () => {
    const isDarkMode = useSelector(state => state.themeModule.isDarkMode)

    return (
        <div className={`${isDarkMode ? 'dark-mode' : ''} favourites-container`}>
            <Header />
            <FavouritesList />
        </div>
    )
}

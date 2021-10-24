import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { weatherService } from '../services/weather.service'
import { PreviewFavourites } from './PreviewFavourites'

export const FavouritesList = () => {
    const isDarkMode = useSelector(state => state.themeModule.isDarkMode)
    const [favouriteCities, setFavouriteCities] = useState()

    useEffect(() => {
        const favouriteCities = weatherService.favouriteCitiesQuery()
        setFavouriteCities(Object.entries(favouriteCities))
    }, [])


    return (
        <div className={`${isDarkMode ? 'dark-mode' : ''} favourite-list main-layout`}>
            {(favouriteCities?.length === 0 || !favouriteCities) && <h2 className="favourites-title">No favourite cities to show</h2>}
            {favouriteCities && favouriteCities.map(city => <PreviewFavourites key={city[0]} cityInfo={city} />)}
        </div>
    )
}

import React, { useEffect, useState } from 'react'
import { weatherService } from '../services/weather.service'
import { PreviewFavourites } from './PreviewFavourites'

export const FavouritesList = () => {

    const [favouriteCities, setFavouriteCities] = useState()

    useEffect(() => {
        const favouriteCities = weatherService.favouriteCitiesQuery()
        setFavouriteCities(Object.entries(favouriteCities))
    }, [])


    return (
        <div className="favourite-list main-layout">
            {favouriteCities && favouriteCities.map(city => <PreviewFavourites key={city[0]} cityInfo={city} />)}
        </div>
    )
}

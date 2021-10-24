import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { weatherService } from '../services/weather.service'

export const PreviewFavourites = ({ cityInfo }) => {

    const [cityDetails, setCityDetails] = useState()

    useEffect(() => {

        const loadCityData = async () => {
            const cityDetails = await weatherService.cityCurrentWeatherQuery({ cityKey: cityInfo[0], cityName: cityInfo[1] })
            setCityDetails(cityDetails)
        }
        loadCityData()

    }, [cityInfo])

    if (!cityDetails) return <h1>Loading...</h1>
    return (
        <Link to={`/${cityInfo[0]}?name=${cityInfo[1]}`}><div className="favourites-preview" >
            <h2 className="favourites-preview-name">{cityDetails.cityName}</h2>
            <h4 className="favourites-preview-temp">{cityDetails.cityData.Temperature.Metric.Value}°</h4>
            <img src={`https://developer.accuweather.com/sites/default/files/${(cityDetails.cityData.WeatherIcon < 10) ? '0' + cityDetails.cityData.WeatherIcon : cityDetails.cityData.WeatherIcon}-s.png`} alt="" />
            <h4 className="favourites-preview-text">{cityDetails.cityData.WeatherText}</h4>
        </div></Link>
    )
}

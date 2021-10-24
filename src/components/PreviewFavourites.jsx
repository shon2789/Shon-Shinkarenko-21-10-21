import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { alertMessage } from '../services/alert.service'
import { weatherService } from '../services/weather.service'

export const PreviewFavourites = ({ cityInfo }) => {

    const [cityDetails, setCityDetails] = useState()
    const isDarkMode = useSelector(state => state.themeModule.isDarkMode)

    useEffect(() => {

        const loadCityData = async () => {
            try {
                const cityDetails = await weatherService.cityCurrentWeatherQuery({ cityKey: cityInfo[0], cityName: cityInfo[1] })
                setCityDetails(cityDetails)
            } catch {
                alertMessage('Oops! Something went wrong', 'danger', 2000)
            }
        }
        loadCityData()

    }, [cityInfo])

    if (!cityDetails) return <h1>Loading...</h1>
    return (
        <Link to={`/${cityInfo[0]}?name=${cityInfo[1]}`}><div className={`${isDarkMode ? 'dark-mode' : ''} favourites-preview`} >
            <h2 className="favourites-preview-name">{cityDetails.cityName}</h2>
            <h4 className="favourites-preview-temp">{cityDetails.cityData.Temperature.Metric.Value}°</h4>
            <img src={`https://developer.accuweather.com/sites/default/files/${(cityDetails.cityData.WeatherIcon < 10) ? '0' + cityDetails.cityData.WeatherIcon : cityDetails.cityData.WeatherIcon}-s.png`} alt="" />
            <h4 className="favourites-preview-text">{cityDetails.cityData.WeatherText}</h4>
        </div></Link>
    )
}

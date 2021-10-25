import React from 'react'
import { useSelector } from 'react-redux'
import { WeeklyWeatherPreview } from './WeeklyWeatherPreview'

export const WeeklyWeather = ({ isCelcius }) => {

    const currCityFiveDaysDetails = useSelector(state => state.weatherModule.currCityFiveDaysDetails)
    const isDarkMode = useSelector(state => state.themeModule.isDarkMode)

    return (
        <section className={`${isDarkMode ? 'dark-mode' : ''} weekly-weather`}>
            <h2 className={isDarkMode ? 'dark-mode' : ''}>Next 5 days...</h2>
            <div className="weekly-weather-preview-container">

                {currCityFiveDaysDetails.map(currDay => <WeeklyWeatherPreview isCelcius={isCelcius} key={currDay.date} currDay={currDay} />)}

            </div>
        </section>
    )
}

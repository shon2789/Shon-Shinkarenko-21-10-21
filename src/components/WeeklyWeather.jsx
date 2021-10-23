import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
// import { weatherService } from '../services/weather.service'
import { WeeklyWeatherPreview } from './WeeklyWeatherPreview'

export const WeeklyWeather = () => {
    const currCityFiveDaysDetails = useSelector(state => state.weatherModule.currCityFiveDaysDetails)

    return (
        <section className="weekly-weather">
            <h2>Next 5 days...</h2>
            <div className="weekly-weather-preview-container">

                {currCityFiveDaysDetails.map(currDay => <WeeklyWeatherPreview key={currDay.date} currDay={currDay} />)}

            </div>
        </section>
    )
}

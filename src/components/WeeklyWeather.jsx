import React from 'react'
import { WeeklyWeatherPreview } from './WeeklyWeatherPreview'

export const WeeklyWeather = () => {
    return (
        <section className="weekly-weather">
            <h2>Next 5 days...</h2>
            <div className="weekly-weather-preview-container">
                <WeeklyWeatherPreview />
                <WeeklyWeatherPreview />
                <WeeklyWeatherPreview />
                <WeeklyWeatherPreview />
                <WeeklyWeatherPreview />
            </div>
        </section>
    )
}

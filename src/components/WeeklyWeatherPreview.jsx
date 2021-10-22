import React from 'react'
import weatherIcon from '../assets/images/cloudy.png'

export const WeeklyWeatherPreview = () => {
    return (
        <div className="weekly-weather-preview">
            <h4>MON</h4>
            <img src={weatherIcon} alt="" />
            <h4>19°</h4>
        </div>
    )
}

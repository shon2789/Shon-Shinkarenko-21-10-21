import React from 'react'
import weatherIcon from '../assets/images/cloudy.png'

export const TodayWeather = () => {
    return (
        <div className="today-weather">
            <div className="current-day">
                <h3>SUN 24</h3>
                <h3>Today in Vancouver</h3>
            </div>
            <div className="current-weather-icon">
                <img src={weatherIcon} alt="" />
                <h4>Moderate sun</h4>
            </div>

            <div className="current-degrees">
                <h4>22°</h4>
            </div>
        </div>
    )
}

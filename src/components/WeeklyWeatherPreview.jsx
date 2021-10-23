import React from 'react'


export const WeeklyWeatherPreview = ({ currDay }) => {
    return (
        <div className="weekly-weather-preview">
            <h4>{currDay.date}</h4>
            <img src={`https://developer.accuweather.com/sites/default/files/${(currDay.icon < 10) ? '0' + currDay.icon : currDay.icon}-s.png`} alt="" />
            <h4>{currDay.temperature}°</h4>
        </div>
    )
}

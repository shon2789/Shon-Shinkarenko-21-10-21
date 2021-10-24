import React from 'react'
import { useSelector } from 'react-redux'
import { utilService } from '../services/util.service'


export const WeeklyWeatherPreview = ({ currDay, isCelcius }) => {

    const isDarkMode = useSelector(state => state.themeModule.isDarkMode)

    return (
        <div className={`${isDarkMode ? 'dark-mode' : ''} weekly-weather-preview`}>
            <h4>{currDay.date}</h4>
            <img src={`https://developer.accuweather.com/sites/default/files/${(currDay.icon < 10) ? '0' + currDay.icon : currDay.icon}-s.png`} alt="" />
            <h4>{isCelcius ? currDay.temperature : utilService.celToFer(currDay.temperature)}°</h4>
        </div>
    )
}

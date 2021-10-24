import React from 'react'
import { useSelector } from 'react-redux'
import { TodayWeather } from './TodayWeather'
import { WeatherTopBar } from './WeatherTopBar'
import { WeeklyWeather } from './WeeklyWeather'

export const WeatherContent = ({ onChooseCity, onToggleFavourite, isFavourite, setIsCelcius, isCelcius }) => {

    const isDarkMode = useSelector(state => state.themeModule.isDarkMode)

    return (
        <div className={`${isDarkMode ? 'dark-mode' : ''} weather-content-container main-layout `}>
            <WeatherTopBar isCelcius={isCelcius} setIsCelcius={setIsCelcius} onChooseCity={onChooseCity} onToggleFavourite={onToggleFavourite} isFavourite={isFavourite} />
            <TodayWeather isCelcius={isCelcius} />
            <WeeklyWeather isCelcius={isCelcius} />
        </div>
    )
}

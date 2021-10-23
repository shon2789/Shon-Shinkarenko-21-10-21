import React from 'react'
import { TodayWeather } from './TodayWeather'
import { WeatherTopBar } from './WeatherTopBar'
import { WeeklyWeather } from './WeeklyWeather'

export const WeatherContent = ({ onChooseCity, onToggleFavourite, isFavourite }) => {

    return (
        <div className="weather-content-container main-layout ">
            <WeatherTopBar onChooseCity={onChooseCity} onToggleFavourite={onToggleFavourite} isFavourite={isFavourite} />
            <TodayWeather />
            <WeeklyWeather />
        </div>
    )
}

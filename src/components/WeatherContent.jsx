import React, { useEffect } from 'react'
import { cityService } from '../services/city.service'
import { TodayWeather } from './TodayWeather'
import { WeatherTopBar } from './WeatherTopBar'
import { WeeklyWeather } from './WeeklyWeather'

export const WeatherContent = () => {

    return (
        <div className="weather-content-container main-layout ">
            <WeatherTopBar />
            <TodayWeather />
            <WeeklyWeather />
        </div>
    )
}

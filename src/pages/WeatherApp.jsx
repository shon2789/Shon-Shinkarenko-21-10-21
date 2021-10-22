import React from 'react'
import { Header } from '../components/Header'
import { WeatherContent } from '../components/WeatherContent'

export const WeatherApp = () => {
    return (
        <main className="weather-app">
            <Header />
            <WeatherContent />
        </main>
    )
}

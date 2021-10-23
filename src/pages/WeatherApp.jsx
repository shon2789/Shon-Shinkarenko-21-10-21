import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router'
import { Header } from '../components/Header'
import { WeatherContent } from '../components/WeatherContent'
import { weatherService } from '../services/weather.service'
import { loadCityFiveDaysWeather, loadCityWeather } from '../store/actions/weather.action'

export const WeatherApp = () => {
    const dispatch = useDispatch()
    const currCity = useSelector(state => state.weatherModule.currCity)
    const { cityKey } = useParams()
    const { search } = useLocation()
    const favouriteCities = weatherService.favouriteCitiesQuery()
    const [isFavourite, setIsfavourite] = useState()

    useEffect(() => {
        if (cityKey) {
            dispatch(loadCityWeather({ cityKey, cityName: search.split('=')[1] }))
            dispatch(loadCityFiveDaysWeather(cityKey))
            return
        }
        if (!currCity)
            dispatch(loadCityWeather({ cityKey: 215854, cityName: 'Tel Aviv' }))
        dispatch(loadCityFiveDaysWeather(215854))
    }, [])

    useEffect(() => {
        if (currCity) {
            if (currCity.cityKey) {
                setIsfavourite(favouriteCities[currCity.cityKey] ? true : false)
            }
        }
    }, [currCity])


    const onChooseCity = (cityData) => {
        dispatch(loadCityWeather(cityData))
        dispatch(loadCityFiveDaysWeather(cityData.cityKey))
    }


    const onToggleFavourite = () => {
        const isToggled = weatherService.toggleFavourite(currCity)
        setIsfavourite(isToggled)
    }

    return (
        <main className="weather-app">
            <Header />
            <WeatherContent onChooseCity={onChooseCity} onToggleFavourite={onToggleFavourite} isFavourite={isFavourite} />
        </main>
    )
}

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router'
import { Header } from '../components/Header'
import { WeatherContent } from '../components/WeatherContent'
import { alertMessage, removeMessage } from '../services/alert.service'
import { weatherService } from '../services/weather.service'
import { loadCityFiveDaysWeather, loadCityWeather } from '../store/actions/weather.action'


export const WeatherApp = () => {
    const currCity = useSelector(state => state.weatherModule.currCity)
    const isDarkMode = useSelector(state => state.themeModule.isDarkMode)
    const favouriteCities = weatherService.favouriteCitiesQuery()
    const [isFavourite, setIsfavourite] = useState()
    const [isCelcius, setIsCelcius] = useState(true)

    const dispatch = useDispatch()
    const { cityKey } = useParams()
    const { search } = useLocation()

    useEffect(() => {
        let defaultLocAlert
        //User came from favourites page
        if (cityKey) {
            dispatch(loadCityWeather({ cityKey, cityName: search.split('=')[1] }))
            dispatch(loadCityFiveDaysWeather(cityKey))
            alertMessage(`Current location: ${search.split('=')[1]}`, 'info', 2500)
            return
        }

        //Getting user's location
        if (!currCity) {

            navigator.geolocation.getCurrentPosition(async (position) => {
                let lat = position.coords.latitude;
                let lng = position.coords.longitude;

                if (lat && lng) {
                    try {
                        const cityDetails = await weatherService.geoLocationQuery({ lat, lng })
                        dispatch(loadCityWeather({ cityKey: cityDetails.cityKey, cityName: cityDetails.cityName }))
                        dispatch(loadCityFiveDaysWeather(cityDetails.cityKey))
                        alertMessage(`Showing your current location: ${cityDetails.cityName}`, 'info', 2500)
                        if (defaultLocAlert) {
                            removeMessage(defaultLocAlert)
                        }
                        return
                    } catch (err) {
                        alertMessage('Oops! Something went wrong', 'danger', 2000)
                    }
                }
            })
        }
        //Default initial location
        if (!currCity) {
            dispatch(loadCityWeather({ cityKey: 215854, cityName: 'Tel Aviv' }))
            dispatch(loadCityFiveDaysWeather(215854))
            defaultLocAlert = alertMessage('Default location set to Tel Aviv', 'info', 2500)
        }
    }, [])

    //Checking wether current city is saved as favourite
    useEffect(() => {
        if (currCity) {
            if (currCity.cityKey) {
                setIsfavourite(favouriteCities[currCity.cityKey] ? true : false)
            }
        }
    }, [currCity])


    //Dispatching choosen city from list to the reducer
    const onChooseCity = (cityData) => {
        dispatch(loadCityWeather(cityData))
        dispatch(loadCityFiveDaysWeather(cityData.cityKey))
        alertMessage(`Showing ${cityData.cityName}'s weather`, 'info', 2500)
    }

    //Add / remove from favourites
    const onToggleFavourite = () => {
        const isToggled = weatherService.toggleFavourite(currCity)
        setIsfavourite(isToggled)
    }

    return (
        <main className={`${isDarkMode ? 'dark-mode' : ''} weather-app`}>
            <Header />
            <WeatherContent setIsCelcius={setIsCelcius} isCelcius={isCelcius} onChooseCity={onChooseCity} onToggleFavourite={onToggleFavourite} isFavourite={isFavourite} />
        </main>
    )
}

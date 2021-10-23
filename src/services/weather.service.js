import axios from "axios"
import { localStorageService } from "./storage.service"
import { utilService } from "./util.service"

const currWeatherStorageKey = 'cityWeather'
const fiveDaysWeatherStorageKey = 'cityDailyForecast'
const favouritesStorageKey = 'favouriteCities'
const apiKey = process.env.REACT_APP_ACCUWEATHER_API

export const weatherService = {
    cityCurrentWeatherQuery,
    cityFiveDaysWeatherQuery,
    toggleFavourite,
    favouriteCitiesQuery
}

async function cityCurrentWeatherQuery({ cityKey, cityName }) {
    const cachedCityWeather = localStorageService.loadFromStorage(currWeatherStorageKey) || {}

    if (cachedCityWeather[cityKey]) {
        if ((Date.now() - cachedCityWeather[cityKey].createdAt) < 1000 * 60 * 1200) {
            console.log('Returned from chache')
            return Promise.resolve(cachedCityWeather[cityKey].data)
        }
    }
    try {
        const cityDetails = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}`)
        cachedCityWeather[cityKey] = {
            data: {
                cityKey,
                cityName,
                cityData: cityDetails.data[0]
            },
            createdAt: Date.now()
        }
        localStorageService.saveToStorage(currWeatherStorageKey, cachedCityWeather)
        console.log('Returned from API')
        return cachedCityWeather[cityKey].data
    } catch (err) {
        console.log(err)
    }

}

async function cityFiveDaysWeatherQuery(cityKey) {
    const cachedCityFiveDayWeather = localStorageService.loadFromStorage(fiveDaysWeatherStorageKey) || {}
    if (cachedCityFiveDayWeather[cityKey]) {
        if ((Date.now() - cachedCityFiveDayWeather[cityKey].createdAt) < 1000 * 60 * 1200) {
            console.log('Returned from chache')
            return Promise.resolve(cachedCityFiveDayWeather[cityKey].data)
        }
    }

    try {
        const cityFiveDaysDetails = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${apiKey}`)
        cachedCityFiveDayWeather[cityKey] = {
            data: cityFiveDaysDetails.data.DailyForecasts.map(currDay => {
                return {
                    date: utilService.getFormattedDay(currDay.EpochDate),
                    temperature: utilService.ferToCel(((currDay.Temperature.Minimum.Value + currDay.Temperature.Maximum.Value) / 2)),
                    icon: currDay.Day.Icon
                }
            }),
            createdAt: Date.now()
        }
        console.log('Returned from API')
        localStorageService.saveToStorage(fiveDaysWeatherStorageKey, cachedCityFiveDayWeather)

        return cachedCityFiveDayWeather[cityKey].data
    } catch (err) {
        console.log(err)
    }
}

function favouriteCitiesQuery() {
    const favouriteCities = localStorageService.loadFromStorage(favouritesStorageKey) || {}
    return favouriteCities
}


function toggleFavourite(cityData) {
    const favouriteCities = localStorageService.loadFromStorage(favouritesStorageKey) || {}

    if (favouriteCities[cityData.cityKey]) {
        delete favouriteCities[cityData.cityKey]
        localStorageService.saveToStorage(favouritesStorageKey, favouriteCities)
        return false
    } else {
        favouriteCities[cityData.cityKey] = cityData.cityName
        localStorageService.saveToStorage(favouritesStorageKey, favouriteCities)
        return true
    }
}


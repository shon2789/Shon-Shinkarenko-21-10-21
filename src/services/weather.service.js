import axios from "axios"
import { alertMessage } from "./alert.service"
import { localStorageService } from "./storage.service"
import { utilService } from "./util.service"

const currWeatherStorageKey = 'cityWeather'
const fiveDaysWeatherStorageKey = 'cityDailyForecast'
const favouritesStorageKey = 'favouriteCities'
const geoLocationStorageKey = 'geoLocation'
const apiKey = process.env.REACT_APP_ACCUWEATHER_API

export const weatherService = {
    cityCurrentWeatherQuery,
    cityFiveDaysWeatherQuery,
    toggleFavourite,
    favouriteCitiesQuery,
    geoLocationQuery
}

async function cityCurrentWeatherQuery({ cityKey, cityName }) {
    //Caching from local storage if available
    const cachedCityWeather = localStorageService.loadFromStorage(currWeatherStorageKey) || {}

    if (cachedCityWeather[cityKey]) {
        if ((Date.now() - cachedCityWeather[cityKey].createdAt) < 1000 * 60 * 30) {
            // console.log('Returned from cache')
            return Promise.resolve(cachedCityWeather[cityKey].data)
        }
    }
    //Loading from API
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
        // console.log('Returned from API')
        return cachedCityWeather[cityKey].data
    } catch (err) {
        alertMessage('Oops! Something went wrong', 'danger', 2000)
    }

}

async function cityFiveDaysWeatherQuery(cityKey) {
    const cachedCityFiveDayWeather = localStorageService.loadFromStorage(fiveDaysWeatherStorageKey) || {}
    if (cachedCityFiveDayWeather[cityKey]) {
        if ((Date.now() - cachedCityFiveDayWeather[cityKey].createdAt) < 1000 * 60 * 30) {
            // console.log('Returned from cache')
            return Promise.resolve(cachedCityFiveDayWeather[cityKey].data)
        }
    }

    //Loading from API
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
        // console.log('Returned from API')
        localStorageService.saveToStorage(fiveDaysWeatherStorageKey, cachedCityFiveDayWeather)

        return cachedCityFiveDayWeather[cityKey].data
    } catch (err) {
        alertMessage('Oops! Something went wrong', 'danger', 2000)
    }
}

async function geoLocationQuery({ lat, lng }) {
    const lastGeoLoc = localStorageService.loadFromStorage(geoLocationStorageKey) || {}
    if (Date.now() - lastGeoLoc.createdAt < 1000 * 60 * 30) {
        // console.log('Returned from cache')
        return Promise.resolve(lastGeoLoc)
    }

    //Loading from API
    try {
        const geoLocDetails = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat}%2C${lng}`)
        const detailsObj = {
            createdAt: Date.now(),
            cityKey: geoLocDetails.data.Key,
            cityName: geoLocDetails.data.LocalizedName
        }
        localStorageService.saveToStorage(geoLocationStorageKey, detailsObj)
        return detailsObj
    } catch (err) {
        alertMessage('Oops! Something went wrong', 'danger', 2000)
    }

}


function favouriteCitiesQuery() {
    const favouriteCities = localStorageService.loadFromStorage(favouritesStorageKey) || {}
    return favouriteCities
}



function toggleFavourite(cityData) {
    const favouriteCities = localStorageService.loadFromStorage(favouritesStorageKey) || {}

    //Checking wether the city exists in local storage favourites
    if (favouriteCities[cityData.cityKey]) {
        delete favouriteCities[cityData.cityKey]
        localStorageService.saveToStorage(favouritesStorageKey, favouriteCities)
        alertMessage(`${cityData.cityName} removed from favourites`, 'info', 2500)
        return false
    } else {
        favouriteCities[cityData.cityKey] = cityData.cityName
        localStorageService.saveToStorage(favouritesStorageKey, favouriteCities)
        alertMessage(`${cityData.cityName} saved to favourites`, 'success', 2500)
        return true
    }
}


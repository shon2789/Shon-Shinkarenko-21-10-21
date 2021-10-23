import { weatherService } from "../../services/weather.service"

export const loadCityWeather = (cityDetails) => {
    return async dispatch => {
        try {
            const cityData = await weatherService.cityCurrentWeatherQuery(cityDetails)
            dispatch({
                type: 'SET_CURR_CITY',
                cityData
            })
            return cityData
        } catch (err) {
            console.log(err)
        }
    }
}

export const loadCityFiveDaysWeather = (cityKey) => {

    return async dispatch => {
        try {
            const daysData = await weatherService.cityFiveDaysWeatherQuery(cityKey)
            dispatch({
                type: 'SET_CURR_CITY_FIVE_DAY',
                daysData
            })
            console.log(daysData, 'daysdata')
            return daysData
        } catch (err) {
            console.log(err)
        }
    }
}
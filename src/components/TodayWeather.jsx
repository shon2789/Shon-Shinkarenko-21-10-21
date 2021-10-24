import React from 'react'
import { useSelector } from 'react-redux'
import { utilService } from '../services/util.service'


export const TodayWeather = ({ isCelcius }) => {

    const currCity = useSelector(state => state.weatherModule.currCity)
    const currDate = utilService.getCurrDay()


    if (!currCity) return <h3>Loading..</h3>
    return (
        <div className="today-weather">
            <div className="current-day">
                <h3>{currDate.day} {currDate.date},</h3>
                <h3 className="current-city">Today in {currCity.cityName}</h3>
            </div>
            <div className="current-weather-icon">
                <img src={`https://developer.accuweather.com/sites/default/files/${(currCity.cityData.WeatherIcon < 10) ? '0' + currCity.cityData.WeatherIcon : currCity.cityData.WeatherIcon}-s.png`} alt="" />
                <h4>{currCity.cityData.WeatherText}</h4>
            </div>

            <div className="current-degrees">
                <h4>{isCelcius ? currCity.cityData.Temperature.Metric.Value : currCity.cityData.Temperature.Imperial.Value}°</h4>
            </div>
        </div>
    )
}

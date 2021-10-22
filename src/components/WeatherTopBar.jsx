import React from 'react'
import AsyncSelect from 'react-select/async';
import { cityService } from '../services/city.service';
import { utilservice } from '../services/util.service';

export const WeatherTopBar = () => {


    const onInput = utilservice.debounce((searchTxt) => { promiseOptions(searchTxt) }, 1000)


    const promiseOptions = async (searchTxt) => {
        if (!searchTxt) return
        try {
            console.log(searchTxt);
            // const searchData = await cityService.query(searchTxt)
            // console.log(searchData)
            // return (searchData)
            return [{ label: 'SSSSSS', value: 'A' }]
        } catch {
            console.log('err')
        }
    }



    return (
        <section className="weather-top-bar">
            {/* <form>
                <input type="text" placeholder="Search city" className="city-search" />
            </form> */}
            <AsyncSelect className="search-city-input" cacheOptions defaultOptions loadOptions={utilservice.debounce((searchTxt) => { promiseOptions(searchTxt) }, 1000)} />

        </section>
    )
}



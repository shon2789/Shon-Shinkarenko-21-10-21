import React, { useCallback, useRef, useState } from 'react'
import { cityService } from '../services/city.service';
import debounce from "lodash.debounce";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import { alertMessage } from '../services/alert.service';
import { useSelector } from 'react-redux';


export const WeatherTopBar = ({ onChooseCity, onToggleFavourite, isFavourite, isCelcius, setIsCelcius }) => {
    const isDarkMode = useSelector(state => state.themeModule.isDarkMode)

    const [searchResults, setSearchResults] = useState()
    const inputRef = useRef()

    //Change handler for the search input
    const changeHandler = async (ev) => {
        if (ev.target.value) {
            try {

                const searchResults = await cityService.query(ev.target.value)
                setSearchResults(searchResults)
                return
            } catch {
                alertMessage('Oops! Something went wrong', 'danger', 2000)
            }
        }
        setSearchResults(null)
    }

    //Debounce to prevent multiple API calls
    const debouncedChangeHandler = useCallback(debounce(changeHandler, 300), [])


    const chooseCity = (res) => {
        onChooseCity({ cityKey: res.value, cityName: res.label })
        inputRef.current.value = ''
        setSearchResults(null)
    }

    const onClearInput = () => {

        //Prevent immediate invoke of blur (<li> onClick will happen first)
        setTimeout(() => {
            setSearchResults(null)
            inputRef.current.value = ''
        }, 500)
    }

    const onSetDegreesType = (boolean) => {
        setIsCelcius(boolean)
        alertMessage(`Degrees are now shown in ${boolean ? 'Celcius' : 'Fahrenheit'}`, 'info', 2500)
    }

    return (
        <section className="weather-top-bar">
            <form>
                <input onBlur={onClearInput} ref={inputRef} name="searchTxt"
                    onChange={(ev) => { debouncedChangeHandler(ev) }}
                    type="text" placeholder="Search city" className={`${searchResults ? 'on-focus' : ''} ${isDarkMode ? 'dark-mode' : ''} city-search`} />
                {searchResults && <div className={`${isDarkMode ? 'dark-mode' : ''} search-list`}><ul>{searchResults.map(res => <li key={res.value} onClick={() => { chooseCity(res) }}>{res.label}, {res.country}</li>)}</ul></div>}
            </form>
            <div className="top-bar-tools-container">

                {!isFavourite &&
                    <Tooltip type="button" title="Save to favourites" arrow placement="top"><div className="icon-container"><MdFavoriteBorder onClick={onToggleFavourite} className="favourite-icon" /></div></Tooltip>
                }
                {isFavourite &&
                    <Tooltip type="button" title="Remove from favourites" arrow placement="top"><div className="icon-container"><MdFavorite onClick={onToggleFavourite} className="favourite-icon" /></div></Tooltip>
                }
                {isCelcius &&
                    <Tooltip type="button" title="Change to fahrenheit" arrow placement="top"><h3 onClick={() => { onSetDegreesType(false) }}>C°</h3></Tooltip>
                }
                {!isCelcius &&
                    <Tooltip type="button" title="Change to celcius" arrow placement="top"><h3 onClick={() => { onSetDegreesType(true) }}>F°</h3></Tooltip>
                }
            </div>
        </section>
    )
}



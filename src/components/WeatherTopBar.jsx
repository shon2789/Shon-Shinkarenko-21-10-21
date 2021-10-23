import React, { useCallback, useRef, useState } from 'react'
import { cityService } from '../services/city.service';
import debounce from "lodash.debounce";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';




export const WeatherTopBar = ({ onChooseCity, onToggleFavourite, isFavourite }) => {

    const [searchResults, setSearchResults] = useState()
    const inputRef = useRef()


    const changeHandler = async (ev) => {
        if (ev.target.value) {
            const searchResults = await cityService.query(ev.target.value)
            setSearchResults(searchResults)
            return
        }
        setSearchResults(null)
    }

    const debouncedChangeHandler = useCallback(debounce(changeHandler, 300), [])


    const chooseCity = (res) => {
        onChooseCity({ cityKey: res.value, cityName: res.label })
        inputRef.current.value = ''
        setSearchResults(null)
    }



    return (
        <section className="weather-top-bar">
            <form>
                <input ref={inputRef} name="searchTxt" onChange={(ev) => { debouncedChangeHandler(ev) }} type="text" placeholder="Search city" className="city-search" />
            </form>
            <div className="search-list">
                <ul>
                    {searchResults && searchResults.map(res => <li key={res.label} onClick={() => { chooseCity(res) }}>{res.label}</li>)}
                </ul>
            </div>
            {!isFavourite &&
                <Tooltip type="button" title="Save to favourites" arrow placement="top"><div className="icon-container"><MdFavoriteBorder onClick={onToggleFavourite} className="favourite-icon" /></div></Tooltip>
            }
            {isFavourite &&
                <Tooltip type="button" title="Remove from favourites" arrow placement="top"><div className="icon-container"><MdFavorite onClick={onToggleFavourite} className="favourite-icon" /></div></Tooltip>
            }
        </section>
    )
}



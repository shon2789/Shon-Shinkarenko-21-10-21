import axios from "axios"
import { alertMessage } from "./alert.service"
import { localStorageService } from "./storage.service"

const api = process.env.REACT_APP_ACCUWEATHER_API
const storageKey = 'cityNames'
const apiUrl = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${api}&q=`

export const cityService = {
    query
}


async function query(searchTxt) {
    //Caching from local storage if available
    const cachedSearch = localStorageService.loadFromStorage(storageKey) || {}

    if (cachedSearch[searchTxt]) {
        if ((Date.now() - cachedSearch[searchTxt].createdAt) < 1000 * 60 * 30) {
            // console.log('Returned from cache')
            return Promise.resolve(cachedSearch[searchTxt].data)
        }
    }

    //Request from API
    try {
        const searchResults = await axios.get(`${apiUrl}${searchTxt}`)
        // console.log('Returned from API')

        cachedSearch[searchTxt] = {
            createdAt: Date.now(),
            data: searchResults.data.map(data => { return { value: data.Key, label: data.LocalizedName, country: data.Country.LocalizedName } })
        }
        //Saving to cache
        localStorageService.saveToStorage(storageKey, cachedSearch)
        return searchResults.data.map(data => { return { value: data.Key, label: data.LocalizedName, country: data.Country.LocalizedName } })
    } catch {
        alertMessage('Oops! Something went wrong', 'danger', 2000)
    }
}

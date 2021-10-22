import axios from "axios"
import { localStorageService } from "./storage.service"

const api = process.env.REACT_APP_ACCUWEATHER_API
const storageKey = 'chachedSearch'
const apiUrl = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${api}&q=`

export const cityService = {
    query
}


async function query(searchTxt) {
    //Caching from local storage
    const chachedSearch = localStorageService.loadFromStorage(storageKey) || {}

    if (chachedSearch[searchTxt]) {
        if ((Date.now() - chachedSearch[searchTxt].createdAt) < 1000 * 60 * 60) {
            console.log('Returned from chache')
            return Promise.resolve(chachedSearch[searchTxt].data)
        }
    }

    //Request from API
    const searchResults = await axios.get(`${apiUrl}${searchTxt}`)
    console.log('Returned from API')

    chachedSearch[searchTxt] = {
        createdAt: Date.now(),
        data: searchResults.data.map(data => { return { value: data.Key, label: data.LocalizedName } })
    }
    //Saving to cache
    localStorageService.saveToStorage(storageKey, chachedSearch)
    return searchResults.data.map(data => { return { value: data.Key, label: data.LocalizedName } })
}

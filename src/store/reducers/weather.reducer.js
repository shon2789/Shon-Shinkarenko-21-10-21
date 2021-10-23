const initialState = {
    currCity: null,
    currCityFiveDaysDetails: []
}

export const weatherReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SET_CURR_CITY':
            return state = { ...state, currCity: action.cityData }
        case 'SET_CURR_CITY_FIVE_DAY':
            return state = { ...state, currCityFiveDaysDetails: action.daysData }
        default:
            return state
    }
}
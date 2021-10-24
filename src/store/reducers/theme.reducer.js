import { localStorageService } from "../../services/storage.service"

const initialState = {
    isDarkMode: localStorageService.loadFromStorage('isDarkMode') || true
}

export const themeReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SET_THEME':
            return state = { isDarkMode: !state.isDarkMode }
        default:
            return state
    }
}
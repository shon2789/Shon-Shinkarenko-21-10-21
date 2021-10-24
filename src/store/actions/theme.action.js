import { utilService } from "../../services/util.service"

export const toggleDarkMode = (boolean) => {
    return dispatch => {
        utilService.toggleDarkMode(boolean)
        dispatch({
            type: 'SET_THEME',
        })
    }
}
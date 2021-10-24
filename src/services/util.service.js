export const utilService = {
    debounce,
    getCurrDay,
    getFormattedDay,
    ferToCel,
    celToFer
}

function debounce(func, timeout = 0.75) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}


function getCurrDay() {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    const day = new Date().getDay()
    const date = new Date().getDate()

    return {
        day: days[day],
        date
    }
}


function getFormattedDay(epochTime) {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    const date = new Date(epochTime * 1000).getDay()

    return days[date]

}


function ferToCel(degrees) {
    return ((5 / 9) * (degrees - 32)).toFixed(1)
}

function celToFer(degrees) {
    return (degrees * (5 / 9) + 32).toFixed(1)
}

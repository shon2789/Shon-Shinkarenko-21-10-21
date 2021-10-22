export const utilservice = {
    debounce
}

function debounce(func, timeout = 0.75) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}
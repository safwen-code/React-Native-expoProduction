const API_TOKEN = 'df32e28b8ff6ef388c4cab59f7ac1013'
//recuperer les donner 
export function getfilm(text, page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN +
        '&language=fr&query=' + text + "&page=" + page
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

// recuperer les image 
export function getimage(name) {
    return 'https://image.tmdb.org/t/p/w500/' + name
}
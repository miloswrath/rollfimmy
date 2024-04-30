// filters.js

//filters by year ascending first.
export function initalFilter(data) {
    return data.sort((a, b) => a.Released_Year - b.Released_Year);
}
export function filterByYear(data, year) {
    return data.filter(item => item.Released_Year === year);
}

export function filterByYears(data, startYear, endYear) {
    return data.filter(item => item.Released_Year >= startYear && item.Released_Year <= endYear);
}

export function filterByGenre(data, genre) {
    return data.filter(item => item.Genre.toLowerCase().includes(genre.toLowerCase()));
}

export function filterByGenres(data, genres) {
    return data.filter(item => genres.some(genre => item.Genre.toLowerCase().includes(genre.toLowerCase())));
}

export function filterByRating(data, rating) {
    return data.filter(item => parseFloat(item.IMDB_Rating) === parseFloat(rating));
}

export function filterByRatings(data, ratingStart, ratingEnd) {
    return data.filter(item => parseFloat(item.IMDB_Rating) >= parseFloat(ratingStart) && parseFloat(item.IMDB_Rating) <= parseFloat(ratingEnd));
}

export function filterByDirector(data, director) {
    return data.filter(item => item.Director.toLowerCase().includes(director.toLowerCase()));
}

export function filterByStar(data, star) {
    return data.filter(item => Object.values(item).slice(9, 13).map(value => value.toLowerCase()).includes(star.toLowerCase()));
}

export function filterBySearch(data, search) {
    return data.filter(item => item.Series_Title.toLowerCase().includes(search.toLowerCase()));
}
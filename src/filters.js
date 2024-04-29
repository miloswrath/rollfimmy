// filters.js

export function filterByYear(data, year) {
    return data.filter(item => item.year === year);
}

export function filterByYears(data, startYear, endYear) {
    return data.filter(item => item.year >= startYear && item.year <= endYear);
}

export function filterByCategory(data, category) {
    return data.filter(item => item.category === category);
}

export function filterByCategories(data, categories) {
    return data.filter(item => categories.includes(item.category));
}

export function filterByRating(data, rating) {
    return data.filter(item => item.rating === rating);
}

export function filterByRatings(data, ratingStart, ratingEnd) {
    return data.filter(item => item.rating >= ratingStart && item.rating <= ratingEnd);
}

export function filterBySearch(data, search) {
    return data.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
}
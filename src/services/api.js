const API_KEY = '46e01a63';
const BASE_URL = 'https://www.omdbapi.com/';

const handleResponse = async (response) => {
  const data = await response.json();
  if (data.Response === 'False') throw new Error(data.Error || 'Unknown error');
  return data;
};

export const getMovies = async (searchTerm, page = 1) => {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}&page=${page}`
  );
  const data = await handleResponse(response);
  return data.Search;
};

export const getMovieDetails = async (id) => {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`
  );
  const data = await handleResponse(response);
  return data;
};

export const getSuggestions = async (term) => {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(term)}`
  );
  const data = await handleResponse(response);
  return data.Search || [];
};

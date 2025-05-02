// import { Movie, SearchResult } from '../types/movie';

// const API_KEY = '684f9380'; // ✅ Make sure this is valid and active
// const BASE_URL = 'http://www.omdbapi.com/';

// if (!API_KEY) {
//   throw new Error('OMDb API key is missing. Please set the API key in omdbService.ts.');
// }

// // 🔍 Search movies by title
// export const searchMovies = async (query: string): Promise<SearchResult> => {
//   const response = await fetch(`${BASE_URL}?s=${encodeURIComponent(query)}&apikey=${API_KEY}`);
//   const data = await response.json();
//   return data;
// };

// // 📄 Get movie details by ID
// export const getMovieDetails = async (id: string): Promise<Movie> => {
//   const response = await fetch(`${BASE_URL}?i=${id}&apikey=${API_KEY}`);
//   const data = await response.json();
//   return data;
// };


import { Movie, SearchResult } from '../types/movie';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY; // ✅ use from .env
const BASE_URL = 'http://www.omdbapi.com/';

if (!API_KEY) {
  throw new Error('OMDb API key is missing. Please set VITE_OMDB_API_KEY in your .env file.');
}

// 🔍 Search movies by title
export const searchMovies = async (query: string): Promise<SearchResult> => {
  const response = await fetch(`${BASE_URL}?s=${encodeURIComponent(query)}&apikey=${API_KEY}`);
  const data = await response.json();
  return data;
};

// 📄 Get movie details by ID
export const getMovieDetails = async (id: string): Promise<Movie> => {
  const response = await fetch(`${BASE_URL}?i=${id}&apikey=${API_KEY}`);
  const data = await response.json();
  return data;
};

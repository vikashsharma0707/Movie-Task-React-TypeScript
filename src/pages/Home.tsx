// // import { useState, useEffect, useCallback } from 'react';
// // import SearchBar from '../components/SearchBar';
// // import MovieCard from '../components/MovieCard';
// // import { searchMovies } from '../services/omdbService';
// // import { Movie } from '../types/movie';
// // import useLocalStorage from '../hooks/useLocalStorage';
// // import '../css/Home.css';

// // function Home() {
// //   const [movies, setMovies] = useState<Movie[]>([]);
// //   const [query, setQuery] = useState('');
// //   const [error, setError] = useState<string | null>(null);
// //   const [loading, setLoading] = useState<boolean>(false);
// //   const [cachedResults, setCachedResults] = useLocalStorage<Record<string, SearchResult>>('searchCache', {});

// //   const debouncedSearch = useCallback(
// //     (searchQuery: string) => {
// //       const handler = setTimeout(() => {
// //         if (searchQuery) {
// //           if (cachedResults[searchQuery]) {
// //             const data = cachedResults[searchQuery];
// //             if (data.Response === 'True') {
// //               setMovies(data.Search);
// //             } else {
// //               setMovies([]);
// //               setError(data.Error || 'No movies found.');
// //             }
// //             setLoading(false);
// //             return;
// //           }

// //           setError(null);
// //           setLoading(true);
// //           searchMovies(searchQuery)
// //             .then((data) => {
// //               if (data.Response === 'True') {
// //                 setMovies(data.Search);
// //               } else {
// //                 setMovies([]);
// //                 setError(data.Error || 'No movies found.');
// //               }
// //               setCachedResults({ ...cachedResults, [searchQuery]: data });
// //             })
// //             .catch((err) => {
// //               setError('Failed to fetch movies. Please try again later.');
// //               console.error(err);
// //             })
// //             .finally(() => {
// //               setLoading(false);
// //             });
// //         } else {
// //           setMovies([]);
// //           setError(null);
// //           setLoading(false);
// //         }
// //       }, 500);

// //       return () => clearTimeout(handler);
// //     },
// //     [cachedResults, setCachedResults]
// //   );

// //   useEffect(() => {
// //     const cancel = debouncedSearch(query);
// //     return () => cancel?.();
// //   }, [query, debouncedSearch]);

// //   return (
// //     <div className="home-container">
// //       <div className="hero-section">
// //         <h1>Find Your Favorite Movies</h1>
// //         <p>Search for movies and add them to your favorites!</p>
// //         <SearchBar onSearch={setQuery} />
// //       </div>

// //       {error && <p className="error-message">{error}</p>}

// //       {movies.length === 0 && !query && !error && !loading && (
// //         <p className="no-results">Start by searching for a movie...</p>
// //       )}

// //       <div className="movie-grid">
// //         {movies.map((movie) => (
// //           <MovieCard key={movie.imdbID} movie={movie} />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Home;




// import { useState, useEffect, useCallback } from 'react';
// import SearchBar from '../components/SearchBar';
// import MovieCard from '../components/MovieCard';
// import { searchMovies } from '../services/omdbService';
// import { Movie, SearchResult } from '../types/movie'; // Added SearchResult import
// import useLocalStorage from '../hooks/useLocalStorage';
// import '../css/Home.css';

// // Custom debounce function
// const debounce = <F extends (...args: any[]) => void>(
//   func: F,
//   wait: number
// ) => {
//   let timeout: ReturnType<typeof setTimeout>;

//   return (...args: Parameters<F>) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func(...args), wait);
//   };
// };

// function Home() {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [query, setQuery] = useState('');
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [cachedResults, setCachedResults] = useLocalStorage<Record<string, SearchResult>>('searchCache', {});

//   const debouncedSearch = useCallback(
//     debounce((searchQuery: string) => {
//       if (searchQuery) {
//         if (cachedResults[searchQuery]) {
//           const data = cachedResults[searchQuery];
//           if (data.Response === 'True') {
//             setMovies(data.Search);
//           } else {
//             setMovies([]);
//             setError(data.Error || 'No movies found.');
//           }
//           setLoading(false);
//           return;
//         }

//         setError(null);
//         setLoading(true);
//         searchMovies(searchQuery)
//           .then((data) => {
//             if (data.Response === 'True') {
//               setMovies(data.Search);
//             } else {
//               setMovies([]);
//               setError(data.Error || 'No movies found.');
//             }
//             setCachedResults({ ...cachedResults, [searchQuery]: data });
//           })
//           .catch((err) => {
//             setError('Failed to fetch movies. Please try again later.');
//             console.error(err);
//           })
//           .finally(() => {
//             setLoading(false);
//           });
//       } else {
//         setMovies([]);
//         setError(null);
//         setLoading(false);
//       }
//     }, 500),
//     [cachedResults, setCachedResults]
//   );

//   useEffect(() => {
//     debouncedSearch(query);
//     return () => {
//       debouncedSearch.cancel = () => clearTimeout(undefined);
//     };
//   }, [query, debouncedSearch]);

//   return (
//     <div className="home-container">
//       <div className="hero-section">
//         <h1>Find Your Favorite Movies</h1>
//         <p>Search for movies and add them to your favorites!</p>
//         <SearchBar onSearch={setQuery} />
//       </div>
//       {loading && (
//         <div className="loading-spinner">
//           <div className="spinner"></div>
//         </div>
//       )}
//       {error && <p className="error-message">{error}</p>}
//       {movies.length === 0 && !query && !error && !loading && (
//         <p className="no-results">Start by searching for a movie...</p>
//       )}
//       <div className="movie-grid">
//         {movies.map((movie) => (
//           <MovieCard key={movie.imdbID} movie={movie} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;





import { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { searchMovies } from '../services/omdbService';
import { Movie, SearchResult } from '../types/movie';
import useLocalStorage from '../hooks/useLocalStorage';
import '../css/Home.css';

// Define a type for the debounced function that includes a cancel method
interface DebouncedFunction<F extends (...args: any[]) => void> {
  (...args: Parameters<F>): void;
  cancel: () => void;
}

// Custom debounce function with cancel method
const debounce = <F extends (...args: any[]) => void>(
  func: F,
  wait: number
): DebouncedFunction<F> => {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  const debounced = (...args: Parameters<F>) => {
    if (timeout !== undefined) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  };

  debounced.cancel = () => {
    if (timeout !== undefined) {
      clearTimeout(timeout);
      timeout = undefined;
    }
  };

  return debounced;
};

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [cachedResults, setCachedResults] = useLocalStorage<Record<string, SearchResult>>('searchCache', {});

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      if (searchQuery) {
        if (cachedResults[searchQuery]) {
          const data = cachedResults[searchQuery];
          if (data.Response === 'True') {
            setMovies(data.Search);
          } else {
            setMovies([]);
            setError(data.Error || 'No movies found.');
          }
          setLoading(false);
          return;
        }

        setError(null);
        setLoading(true);
        searchMovies(searchQuery)
          .then((data) => {
            if (data.Response === 'True') {
              setMovies(data.Search);
            } else {
              setMovies([]);
              setError(data.Error || 'No movies found.');
            }
            setCachedResults({ ...cachedResults, [searchQuery]: data });
          })
          .catch((err) => {
            setError('Failed to fetch movies. Please try again later.');
            console.error(err);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setMovies([]);
        setError(null);
        setLoading(false);
      }
    }, 500),
    [cachedResults, setCachedResults]
  );

  useEffect(() => {
    debouncedSearch(query);
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Find Your Favorite Movies</h1>
        <p>Search for movies and add them to your favorites!</p>
        <SearchBar onSearch={setQuery} />
      </div>
      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
      {movies.length === 0 && !query && !error && !loading && (
        <p className="no-results">Start by searching for a movie...</p>
      )}
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
// import { useState, useEffect } from 'react';
// import MovieCard from '../components/MovieCard';
// import { Movie } from '../types/movie';
// import useLocalStorage from '../hooks/useLocalStorage';
// import '../css/Favorites.css';

// function Favorites() {
//   const [favorites, setFavorites] = useLocalStorage<Movie[]>('favorites', []);
//   const [movies, setMovies] = useState<Movie[]>([]);

//   useEffect(() => {
//     setMovies(favorites);
//   }, [favorites]);

//   const handleRemove = (id: string) => {
//     const updatedFavorites = favorites.filter((movie) => movie.imdbID !== id);
//     setFavorites(updatedFavorites);
//   };

//   return (
//     <div className="favorites-container">
//       <h1 className="favorites-title">Your Favorite Movies</h1>
//       {movies.length === 0 ? (
//         <p className="no-favorites">You haven't added any favorites yet.</p>
//       ) : (
//         <div className="movie-grid">
//           {movies.map((movie) => (
//             <div key={movie.imdbID} className="favorite-movie-wrapper">
//               <MovieCard movie={movie} />
//               <button
//                 className="remove-button"
//                 onClick={() => handleRemove(movie.imdbID)}
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Favorites;



import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { Movie } from '../types/movie';
import useLocalStorage from '../hooks/useLocalStorage';
import '../css/Favorites.css';

function Favorites() {
  const [favorites, setFavorites] = useLocalStorage<Movie[]>('favorites', []);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    setMovies(favorites);
  }, [favorites]);

  const handleRemove = (id: string) => {
    const updatedFavorites = favorites.filter((movie) => movie.imdbID !== id);
    setFavorites(updatedFavorites);
  };

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">Your Favorite Movies</h1>
      {movies.length === 0 ? (
        <p className="no-favorites">You haven't added any favorites yet.</p>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="favorite-movie-wrapper">
              <MovieCard movie={movie} />
              <button
                className="remove-button"
                onClick={() => handleRemove(movie.imdbID)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
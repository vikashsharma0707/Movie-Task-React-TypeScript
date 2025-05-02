// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { getMovieDetails } from '../services/omdbService';
// import { Movie } from '../types/movie';
// import '../css/MovieDetails.css';

// function MovieDetails() {
//   const { id } = useParams<{ id: string }>();
//   const [movie, setMovie] = useState<Movie | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (id) {
//       setLoading(true);
//       setError(null);
//       getMovieDetails(id)
//         .then((data) => {
//           if (data.Response === 'True') {
//             setMovie(data);
//           } else {
//             setError(data.Error || 'Movie not found.');
//           }
//         })
//         .catch((err) => {
//           setError('Failed to fetch movie details.');
//           console.error(err);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     }
//   }, [id]);

//   if (loading) {
//     return <div className="loading">Loading...</div>;
//   }

//   if (error || !movie) {
//     return <div className="error">{error || 'Movie not found.'}</div>;
//   }

//   return (
//     <div className="movie-details-container">
//       <div className="movie-details-header">
//         <img
//           className="movie-details-poster"
//           src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
//           alt={movie.Title}
//         />
//         <div className="movie-details-info">
//           <h1 className="movie-details-title">{movie.Title} ({movie.Year})</h1>
//           <p className="movie-details-meta">{movie.Genre} | {movie.Runtime} | Rated {movie.Rated}</p>
//           <p className="movie-details-director"><strong>Director:</strong> {movie.Director}</p>
//           <p className="movie-details-plot">{movie.Plot}</p>
//           <div className="movie-details-ratings">
//             {movie.Ratings?.map((rating, index) => (
//               <span key={index} className="rating">
//                 {rating.Source}: {rating.Value}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MovieDetails;



import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../services/omdbService';
import { Movie } from '../types/movie';
import '../css/MovieDetails.css';

function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Movie ID is missing.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    getMovieDetails(id)
      .then((data) => {
        setMovie(data);
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch movie details.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!movie) {
    return <div className="error">Movie not found.</div>;
  }

  return (
    <div className="movie-details-container">
      <div className="movie-details-header">
        <img src={movie.Poster} alt={movie.Title} className="movie-details-poster" />
        <div className="movie-details-info">
          <h1 className="movie-details-title">{movie.Title}</h1>
          <p className="movie-details-meta">
            {movie.Year} • {movie.Runtime} • {movie.Rated}
          </p>
          <p className="movie-details-director">
            <strong>Director:</strong> {movie.Director || 'N/A'}
          </p>
          <p className="movie-details-plot">{movie.Plot || 'No description available.'}</p>
          <div className="movie-details-ratings">
            {movie.Ratings?.map((rating, index) => (
              <span key={index} className="rating">
                {rating.Source}: {rating.Value}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
import { Link } from 'react-router-dom';
import { Movie } from '../types/movie';
import FavoriteButton from './FavoriteButton';
import '../css/MovieCard.css';

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="movie-card">
      <img
        className="movie-poster"
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}
        alt={movie.Title}
      />
      <div className="movie-info">
        <h3 className="movie-title">{movie.Title}</h3>
        <p className="movie-year">{movie.Year}</p>
        <div className="movie-actions">
          <FavoriteButton movie={movie} />
          <Link to={`/movie/${movie.imdbID}`} className="more-info-button">
            More Info
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
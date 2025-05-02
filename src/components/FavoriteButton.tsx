import { useState, useEffect } from 'react';
import { Movie } from '../types/movie';
import useLocalStorage from '../hooks/useLocalStorage';
import '../css/FavoriteButton.css';

interface FavoriteButtonProps {
  movie: Movie;
}

function FavoriteButton({ movie }: FavoriteButtonProps) {
  const [favorites, setFavorites] = useLocalStorage<Movie[]>('favorites', []);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    setIsFavorite(favorites.some((fav) => fav.imdbID === movie.imdbID));
  }, [favorites, movie.imdbID]);

  const toggleFavorite = () => {
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
      onClick={toggleFavorite}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={isFavorite ? '#ff6b6b' : 'none'}
        stroke={isFavorite ? '#ff6b6b' : '#666'}
        strokeWidth="2"
        className="favorite-icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
        />
      </svg>
    </button>
  );
}

export default FavoriteButton;
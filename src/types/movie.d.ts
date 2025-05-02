// export interface Movie {
//     imdbID: string;
//     Title: string;
//     Year: string;
//     Poster: string;
//     Genre?: string;
//     Director?: string;
//     Plot?: string;
//     Ratings?: { Source: string; Value: string }[];
//   }
  
//   export interface SearchResult {
//     Search: Movie[];
//     totalResults: string;
//     Response: string;
//   }



export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Genre?: string;
  Director?: string;
  Plot?: string;
  Ratings?: Array<{ Source: string; Value: string }>;
  Runtime?: string; // Added for MovieDetails
  Rated?: string;  // Added for MovieDetails
}

export interface SearchResult {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string; // Added to handle error responses
}
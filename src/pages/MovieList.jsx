import { useState, useEffect, useCallback } from 'react';
import { 
  Grid, 
  TextField, 
  CircularProgress, 
  Typography,
  MenuItem,
  Paper,
  useMediaQuery 
} from '@mui/material';
import { debounce } from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from '../components/MovieCard';
import { useMovieContext } from '../contexts/MovieContext';

const MovieList = () => {
  const { 
    movies,
    suggestions,
    searchTerm,
    hasMore,
    loading,
    fetchMovies,
    fetchSuggestions,
    dispatch
  } = useMovieContext();
  
  const [showSuggestions, setShowSuggestions] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const debouncedSearch = useCallback(
    debounce((term) => {
      dispatch({ type: 'SET_SEARCH', payload: term });
    }, 500),
    []
  );

  useEffect(() => {
    fetchMovies();
  }, [searchTerm, fetchMovies]);

  const handleSearch = (term) => {
    if (term.length > 2) {
      fetchSuggestions(term);
    }
    debouncedSearch(term);
  };

  return (
    <div style={{ padding: isMobile ? '1rem' : '2rem' }}>
      <div style={{ position: 'relative', marginBottom: '2rem' }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Search Movies"
          defaultValue={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        
        {showSuggestions && suggestions.length > 0 && (
          <Paper 
            sx={{ 
              position: 'absolute', 
              width: '100%', 
              zIndex: 1,
              maxHeight: 300,
              overflow: 'auto'
            }}
          >
            {suggestions.map((suggestion) => (
              <MenuItem 
                key={suggestion.imdbID}
                onClick={() => {
                  dispatch({ type: 'SET_SEARCH', payload: suggestion.Title });
                  setShowSuggestions(false);
                }}
              >
                {suggestion.Title}
              </MenuItem>
            ))}
          </Paper>
        )}
      </div>

      <InfiniteScroll
        dataLength={movies.length}
        next={() => dispatch({ type: 'SET_PAGE' })}
        hasMore={hasMore}
        loader={<CircularProgress sx={{ display: 'block', margin: '2rem auto' }} />}
      >
        <Grid container spacing={isMobile ? 2 : 3}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>

      {!loading && movies.length === 0 && (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          No movies found
        </Typography>
      )}
    </div>
  );
};

export default MovieList;
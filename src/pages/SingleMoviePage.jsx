import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Button, 
  Typography, 
  Container, 
  Grid, 
  CircularProgress,
  Chip 
} from '@mui/material';
import { useMovieContext } from '../contexts/MovieContext';

const SingleMoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentMovie, loading, fetchMovieDetails } = useMovieContext();

  useEffect(() => {
    fetchMovieDetails(id);
  }, [id, fetchMovieDetails]);

  if (loading) return <CircularProgress sx={{ display: 'block', margin: '4rem auto' }} />;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button 
        variant="outlined" 
        onClick={() => navigate(-1)}
        sx={{ mb: 4 }}
      >
        Back to List
      </Button>

      {currentMovie && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <img
              src={currentMovie.Poster} 
              alt={currentMovie.Title}
              style={{ 
                width: '100%', 
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h3" gutterBottom>
              {currentMovie.Title}
            </Typography>
            <Chip label={currentMovie.Year} sx={{ mr: 1, mb: 2 }} />
            <Chip label={currentMovie.Rated} color="secondary" sx={{ mr: 1, mb: 2 }} />
            <Chip label={currentMovie.Runtime} variant="outlined" sx={{ mb: 2 }} />
            
            <Typography paragraph sx={{ mb: 2 }}>
              {currentMovie.Plot}
            </Typography>
            
            <Typography variant="subtitle1" gutterBottom>
              Director: {currentMovie.Director}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Actors: {currentMovie.Actors}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Genre: {currentMovie.Genre}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              IMDB Rating: {currentMovie.imdbRating}
            </Typography>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default SingleMoviePage;
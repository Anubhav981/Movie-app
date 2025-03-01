import { Card, CardMedia, CardContent, Typography, Chip } from '@mui/material';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <CardMedia
      component="img"
      height="300"
      image={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.jpg'}
      alt={movie.Title}
      sx={{ objectFit: 'cover' }}
    />
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography 
        gutterBottom 
        variant="h6" 
        component={Link} 
        to={`/movie/${movie.imdbID}`}
        sx={{ 
          textDecoration: 'none',
          '&:hover': { textDecoration: 'underline' }
        }}
      >
        {movie.Title}
      </Typography>
      <Chip label={movie.Year} size="small" sx={{ mr: 1 }} />
      <Chip label={movie.Type} color="secondary" size="small" />
    </CardContent>
  </Card>
);

export default MovieCard;
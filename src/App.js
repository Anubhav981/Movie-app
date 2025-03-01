import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { MovieProvider } from './contexts/MovieContext';
import ErrorBoundary from './components/ErrorBoundary';
import MovieList from './pages/MovieList';
import SingleMoviePage from './pages/SingleMoviePage';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MovieProvider>
        <ErrorBoundary>
          <Router>
            <Routes>
              <Route path="/" element={<MovieList />} />
              <Route path="/movie/:id" element={<SingleMoviePage />} />
            </Routes>
          </Router>
        </ErrorBoundary>
      </MovieProvider>
    </ThemeProvider>
  );
}

export default App;
import { 
    createContext, 
    useReducer, 
    useCallback, 
    useContext 
  } from 'react';
  import { 
    getMovies, 
    getMovieDetails, 
    getSuggestions 
  } from '../services/api';
  
  const MovieContext = createContext();
  
  const initialState = {
    movies: [],
    suggestions: [],
    currentMovie: null,
    searchTerm: 'marvel',
    page: 1,
    hasMore: true,
    loading: false,
    error: null,
  };
  
  function reducer(state, action) {
    switch (action.type) {
      case 'SET_MOVIES':
        return { 
          ...state, 
          movies: [...state.movies, ...action.payload], 
          hasMore: action.payload.length > 0,
          loading: false 
        };
      case 'SET_SUGGESTIONS':
        return { ...state, suggestions: action.payload };
      case 'SET_MOVIE':
        return { ...state, currentMovie: action.payload, loading: false };
      case 'SET_SEARCH':
        return { ...state, searchTerm: action.payload, page: 1, movies: [] };
      case 'SET_PAGE':
        return { ...state, page: state.page + 1 };
      case 'SET_LOADING':
        return { ...state, loading: action.payload };
      case 'SET_ERROR':
        return { ...state, error: action.payload, loading: false };
      default:
        return state;
    }
  }
  
  export const MovieProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    const fetchMovies = useCallback(async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const movies = await getMovies(state.searchTerm, state.page);
        dispatch({ type: 'SET_MOVIES', payload: movies });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error });
      }
    }, [state.searchTerm, state.page]);
  
    const fetchMovieDetails = useCallback(async (id) => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const movie = await getMovieDetails(id);
        dispatch({ type: 'SET_MOVIE', payload: movie });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error });
      }
    }, []);
  
    const fetchSuggestions = useCallback(async (term) => {
      try {
        const suggestions = await getSuggestions(term);
        dispatch({ type: 'SET_SUGGESTIONS', payload: suggestions });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error });
      }
    }, []);
  
    return (
      <MovieContext.Provider value={{
        ...state,
        dispatch,
        fetchMovies,
        fetchMovieDetails,
        fetchSuggestions
      }}>
        {children}
      </MovieContext.Provider>
    );
  };
  
  // Custom hook to access context
  export const useMovieContext = () => {
    const context = useContext(MovieContext);
    if (!context) {
      throw new Error('useMovieContext must be used within a MovieProvider');
    }
    return context;
  };
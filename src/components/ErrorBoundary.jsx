import { useState, createContext } from 'react';
import Alert from '@mui/material/Alert';

export const ErrorBoundaryContext = createContext();

const ErrorBoundary = ({ children }) => {
  const [error, setError] = useState(null);

  return (
    <ErrorBoundaryContext.Provider value={setError}>
      {error ? (
        <Alert severity="error" sx={{ m: 2 }}>
          {error.message} - Please try again later
        </Alert>
      ) : (
        children
      )}
    </ErrorBoundaryContext.Provider>
  );
};

export default ErrorBoundary;
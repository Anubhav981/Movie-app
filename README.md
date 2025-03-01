<p># Movie Explorer 🎮</p>

<p>A responsive movie listing web application using OMDB API with React.js and Material-UI.</p>


<p>## Features ✨</p>
<p>🎥 Movie search with debounce functionality</p>
<p>🔍 Type-ahead search suggestions</p>
<p>♾️ Infinite scroll pagination</p>
<p>📱 Fully responsive design (Mobile, Tablet, Desktop)</p>
<p>🎬 Detailed movie information page</p>
<p>🌀 Loading states and error handling</p>
<p>🔄 Context API for state management</p>
<p>🎨 Material-UI components with custom theme</p>

<p>## Installation ⚙️</p>
<p>1. Clone the repository:</p>
<p><code>git clone https://github.com/your-username/movie-explorer.git</code></p>

<p>2. Install dependencies:</p>
<p><code>npm install</code></p>

<p>3. Start development server:</p>
<p><code>npm start</code></p>

<p>4. Open in browser:</p>
<p><code>http://localhost:3000</code></p>

<p>## Tech Stack 💻</p>
<p><strong>Frontend:</strong></p>
<p>React.js (v18+)</p>
<p>Material-UI (v5+)</p>
<p>React Router (v6+)</p>
<p>Axios (HTTP client)</p>
<p>Lodash (Debounce)</p>

<p><strong>State Management:</strong></p>
<p>React Context API</p>
<p>useReducer Hook</p>

<p><strong>API:</strong></p>
<p>OMDB API</p>

<p>## Folder Structure 📁</p>
<p>movie-explorer/</p>
<p>├── public/</p>
<p>├── src/</p>
<p>│   ├── components/</p>
<p>│   │   ├── ErrorBoundary.jsx</p>
<p>│   │   └── MovieCard.jsx</p>
<p>│   ├── contexts/</p>
<p>│   │   └── MovieContext.jsx</p>
<p>│   ├── pages/</p>
<p>│   │   ├── MovieList.jsx</p>
<p>│   │   └── SingleMoviePage.jsx</p>
<p>│   ├── services/</p>
<p>│   │   └── api.js</p>
<p>│   ├── App.js</p>
<p>│   └── index.js</p>
<p>├── .env.example</p>
<p>├── package.json</p>
<p>└── README.md</p>

<p>## Key Features Implementation 🛠️</p>
<p><strong>Search with Debounce</strong></p>

<p><code>const debouncedSearch = useCallback(
  debounce((term) => {
    dispatch({ type: 'SET_SEARCH', payload: term });
  }, 500),
  []
);</code></p>

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './pages/Home/Home.jsx';
import Details from './pages/Details/Details.jsx';
import MovieList from './pages/MovieList/MovieList.jsx';
import Error from './pages/Error/Error.jsx';
import { store } from './store/store.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'details/:id',
        element: <Details />,
      },

      {
        path: 'movie_list',
        element: <MovieList />,
      },
      {
        errorElement: <Error />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);

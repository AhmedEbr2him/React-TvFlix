import './SearchModel.css';
import { api_key, fetchDataFromServe } from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import MovieCard from '../MovieCard';
import { setIsModalActive, setIsSearching } from '../../store';

const SearchModal = () => {
  const dispatch = useDispatch();
  const { inputFieldValue, isModalActive } = useSelector(state => state.movieReducer);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    if (inputFieldValue.trim()) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputFieldValue, isModalActive]);

  const fetchData = async () => {
    fetchDataFromServe(
      `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${inputFieldValue}&include_adult=false&page=1`,
      function ({ results }) {
        setMovieList(results);
        dispatch(setIsSearching(false));
      }
    );
  };

  return (
    <div className={`search_modal ${isModalActive ? 'active' : ''}`}>
      <p className='label'>Results for </p>
      <h1 className='heading'>{inputFieldValue}</h1>
      <section className='movie_list'>
        <div className='grid_list'>
          {movieList.length > 0 &&
            movieList.map((movie, index) => (
              <MovieCard
                key={index}
                movie={movie}
                onClick={() => dispatch(setIsModalActive(false))}
              />
            ))}
        </div>
      </section>
    </div>
  );
};
export default SearchModal;

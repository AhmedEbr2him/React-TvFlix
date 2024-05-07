/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { fetchDataFromServe, api_key } from '../../api/api';
import MovieCard from '../../components/MovieCard';

const SuggestestMovies = ({ id }) => {
  const [movieList, setMovieList] = useState([]);

  const fetchData = async () => {
    fetchDataFromServe(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${api_key}&page=1`,
      function ({ results }) {
        setMovieList(results);
      }
    );
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <section className='movie_list' aria-label='You May Also Like'>
      <div className='title_wrapper'>
        <h3 className='title_large'>You May Also Like</h3>
      </div>

      <div className='slider_list'>
        <div className='slider_inner'>
          {movieList.map((movie, index) => (
            <MovieCard key={index} movie={movie} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default SuggestestMovies;

import './Details.css';
import '../../index.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { api_key, fetchDataFromServe } from '../../api/api';
import MovieDetail from './MovieDetail';
import SuggestestMovies from './SuggestestMovies';
import SearchModal from '../../components/SearchModal/SearchModal';
import { setIsModalActive } from '../../store';
const Details = () => {
  let { id } = useParams();
  //! null is important becuse when page i ready dont return empty object or array
  const [movieItem, setMoiveItem] = useState(null);
  const { isModalActive } = useSelector(state => state.movieReducer);
  const dispatch = useDispatch();
  const fetchData = async () => {
    fetchDataFromServe(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&append_to_response=casts,videos,images,releases`,
      function (movie) {
        setMoiveItem(movie);
      }
    );
  };

  useEffect(() => {
    fetchData();
    dispatch(setIsModalActive(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      {isModalActive ? (
        <SearchModal />
      ) : (
        <article className='container'>
          {movieItem && <MovieDetail movie={movieItem} />}
          <SuggestestMovies id={id} />
        </article>
      )}
    </>
  );
};
export default Details;

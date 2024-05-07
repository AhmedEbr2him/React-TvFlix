import SearchModal from '../../components/SearchModal/SearchModal';
import './MovieList.css';
import MovieListSection from './MovieListSection';
import { useSelector } from 'react-redux';

const MovieList = () => {
  const { isModalActive } = useSelector(state => state.movieReducer);

  return (
    <>
      {isModalActive ? (
        <SearchModal />
      ) : (
        <article className='container'>
          <MovieListSection />
        </article>
      )}
    </>
  );
};
export default MovieList;

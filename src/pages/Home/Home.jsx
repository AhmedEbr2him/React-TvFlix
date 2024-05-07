import './Home.css';
import Banner from './Banner';
import MovieListSection from './MovieListSection';
import SearchModal from '../../components/SearchModal/SearchModal';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Home = () => {
  const { isModalActive } = useSelector(state => state.movieReducer);

  useEffect(() => {
    document.title = 'TvFlix';
  }, []);

  return (
    <>
      {isModalActive ? (
        <SearchModal />
      ) : (
        <article className='container'>
          <Banner />
          <MovieListSection />
        </article>
      )}
    </>
  );
};
export default Home;

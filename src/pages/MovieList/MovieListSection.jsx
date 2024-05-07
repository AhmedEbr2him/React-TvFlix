import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { api_key, fetchDataFromServe } from '../../api/api';
import MovieCard from '../../components/MovieCard';

const MovieListSection = () => {
  const [movieList, setMovieList] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { genreName, genreId } = useSelector(state => state.movieReducer);
  const [isLoading, setIsLoading] = useState(false);

  /* FETCH MAIN DATA */
  const fetchData = async () => {
    fetchDataFromServe(
      `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&include_video=false&sort_by=popularity.desc&include_adult=true&page=${currentPage}&${genreId}`,
      function ({ results, total_pages }) {
        setMovieList(results);
        setTotalPages(total_pages);
      }
    );
  };

  /* LOAD MORE DATA */
  const fetchLoadMore = async () => {
    setCurrentPage(currentPage => (currentPage += 1));
    fetchDataFromServe(
      `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&include_video=false&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${genreId}`,
      function ({ results }) {
        setMovieList(prevResults => [...prevResults, ...results]);
        setIsLoading(false);
      }
    );
    setIsLoading(true);
  };

  useEffect(() => {
    fetchLoadMore();
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genreName, genreId]);

  return (
    <section className='movie_list genre_list' aria-label={genreName}>
      <div className='title_wrapper'>
        <h1 className='heading'>All {genreName} Movies</h1>
      </div>
      <div className='grid_list'>
        {movieList &&
          movieList.map((movie, index) => {
            return <MovieCard key={index} movie={movie} />;
          })}
      </div>

      <button
        className={`btn load_more ${isLoading ? 'loading' : ''}`}
        style={{ display: currentPage >= totalPages ? 'none' : '' }}
        onClick={() => fetchLoadMore()}
      >
        Load More
      </button>
    </section>
  );
};
export default MovieListSection;

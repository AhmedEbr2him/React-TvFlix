import { useEffect } from 'react';
import { api_key, fetchDataFromServe } from '../../api/api';
import { useState } from 'react';
import MovieCard from '../../components/MovieCard';

const MovieListSection = () => {
  const [movieList, setMovieList] = useState([]);
  const homePageSection = [
    {
      title: 'Upcoming Movies',
      path: '/movie/upcoming',
    },
    {
      title: 'Weekly Trending Movies',
      path: '/trending/movie/week',
    },
    {
      title: 'Top Rated Movies',
      path: '/movie/top_rated',
    },
  ];
  const fetchData = async () => {
    for (const { title, path } of homePageSection) {
      fetchDataFromServe(
        `https://api.themoviedb.org/3/${path}?api_key=${api_key}&page=1`,
        function ({ results }) {
          setMovieList(prevResults => ({ ...prevResults, [title]: results }));
        }
      );
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return homePageSection.map(({ title }, index) => {
    return (
      <section key={index} className='movie_list' aria-label={title}>
        <div className='title_wrapper'>
          <h3 className='title_larege'>{title}</h3>
        </div>

        <div className='slider_list'>
          <div className='slider_inner'>
            {movieList[title] &&
              movieList[title].map((movie, index) => <MovieCard key={index} movie={movie} />)}
          </div>
        </div>
      </section>
    );
  });
};
export default MovieListSection;

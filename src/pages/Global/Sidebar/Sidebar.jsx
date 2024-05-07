import './Sidebar.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { staticImages } from '../../../utils/images';
import { api_key, fetchDataFromServe } from '../../../api/api';
import { setIsSidebarActive, setGenre } from '../../../store';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { isSidebarActive } = useSelector(state => state.movieReducer);
  const [genreList, setGenreList] = useState({});
  const languageList = ['English', 'French', 'Arabic'];

  /* CLOSE MENU */
  const handleLink = () => {
    dispatch(setIsSidebarActive());
  };

  /* GET DATA FROM SERVER */
  const fetchData = async () => {
    fetchDataFromServe(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`,
      function ({ genres }) {
        const newGenre = {};
        for (const { id, name } of genres) {
          newGenre[id] = name;
        }
        setGenreList(newGenre);
      }
    );
  };

  const getMovieList = (genreId, genreName) => {
    dispatch(setGenre({ genreId, genreName }));
  };

  /* FIRE FUNCTION */
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <nav className={`sidebar ${isSidebarActive ? 'active' : ''}`}>
        <div className='sidebar_list'>
          <p className='title'>Genre</p>
          {Object.entries(genreList).map(([genreId, genreName], index) => {
            return (
              <Link
                key={`${genreName}-${index}`}
                to='/movie_list'
                className='sidebar_link'
                onClick={() => {
                  handleLink(genreId);
                  getMovieList(`with_genres=${genreId}`, genreName);
                }}
              >
                {genreName}
              </Link>
            );
          })}
        </div>

        <br />
        <div className='sidebar_list'>
          <p className='title'>Language</p>
          {languageList.map((lang, index) => (
            <Link
              key={index}
              to='/movie_list'
              className='sidebar_link'
              onClick={() => {
                handleLink();
                getMovieList(`with_original_language=${lang.slice(0, 2).toLowerCase()}`, `${lang}`);
              }}
            >
              {lang}
            </Link>
          ))}
        </div>

        <div className='sidebar_footer'>
          <p className='copyright'>
            <span>Copyright 2023</span> <Link to='#'>ahmedebrahim</Link>
          </p>

          <Link to='https://www.themoviedb.org/'>
            <img
              src={staticImages.tmdbLogo}
              alt='the movie database logo'
              width='130'
              height='17'
            />
          </Link>
        </div>
      </nav>

      <div
        className={`overlay ${isSidebarActive ? 'active' : ''}`}
        onClick={() => dispatch(setIsSidebarActive())}
      ></div>
    </>
  );
};
export default Sidebar;

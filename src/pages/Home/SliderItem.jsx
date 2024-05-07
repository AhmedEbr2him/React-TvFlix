/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api_key, fetchDataFromServe, imageBaseURL } from '../../api/api';
import { FaRegPlayCircle } from 'react-icons/fa';

const SliderItem = ({ movie, index, activeBannerIndex }) => {
  const [genreList, setGenreList] = useState({});
  const { backdrop_path, title, release_date, overview, genre_ids, vote_average, id } = movie;

  /* FUNCTION TO CHANGE GENRE FROM [28,38] TO [ACTION,ROMANCE] */
  const genreListIdAsString = genreIdList => {
    return genreIdList.map(genreId => genreList[genreId]).join(', ');
  };

  /**
   * fetch all genre eg: [{"id":123,"name":"Action"}]
   * then change genre formate eg: [{"123":"Action"}]
   */
  useEffect(() => {
    fetchDataFromServe(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`,
      function ({ genres }) {
        const newGenreList = {};
        for (const { id, name } of genres) {
          newGenreList[id] = name;
        }
        setGenreList(newGenreList);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`slider_item ${index === activeBannerIndex ? 'active' : ''}`}>
      <img
        src={`${imageBaseURL}w1280${backdrop_path}`}
        alt={title}
        loading={index === 0 ? 'eager' : 'lazy'}
        className='img_cover'
      />

      <div className='banner_content'>
        <h2 className='heading'>{title}</h2>

        <div className='meta_list'>
          <div className='meta_item'>{release_date.split('-')[0]}</div>
          <div className='meta_item card_badge'>{vote_average.toFixed(1)}</div>
        </div>

        <p className='genre'>{genreListIdAsString(genre_ids)}</p>

        <p className='banner_text'>{overview}</p>

        <Link to={`/details/${id}`} className='btn'>
          <FaRegPlayCircle size={20} />
          <span className='span'>Watch Now</span>
        </Link>
      </div>
    </div>
  );
};
export default SliderItem;

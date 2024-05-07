/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { imageBaseURL } from '../api/api';
import { staticImages } from '../utils/images';

const MovieCard = ({ movie }) => {
  const { poster_path, title, vote_average, release_date, id } = movie;

  return (
    <div className='movie_card'>
      <figure className='poster_box card_banner'>
        <img
          src={`${imageBaseURL}w342${poster_path}`}
          alt={title}
          className='img_cover'
          loading='lazy'
        />
      </figure>

      <h4 className='title'>{title}</h4>

      <div className='meta_list'>
        <div className='meta_item'>
          <img src={staticImages.rateStar} alt='rating' width='20' height='20' loading='lazy' />

          <span className='span'>{vote_average.toFixed(1)}</span>
        </div>
        <div className='card_badge'>{release_date.split('-')[0]}</div>
      </div>

      <Link to={`/details/${id}`} className='card_btn' title={title}></Link>
    </div>
  );
};
export default MovieCard;

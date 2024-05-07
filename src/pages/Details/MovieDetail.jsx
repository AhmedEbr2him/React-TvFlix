/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { imageBaseURL } from '../../api/api';
import { staticImages } from '../../utils/images';
const MovieDetail = ({ movie }) => {
  const {
    backdrop_path,
    poster_path,
    title,
    release_date,
    runtime,
    vote_average,
    releases: {
      countries: [{ certification }],
    },
    genres,
    overview,
    casts: { cast, crew },
    videos: { results: videos },
  } = movie;

  const getDirector = crewList => {
    const directors = crewList.filter(({ job }) => job === 'Director');
    const directorsList = [];
    for (const { name } of directors) directorsList.push(name);
    return directorsList.join(', ');
  };

  const filterVideos = videoList => {
    return videoList.filter(
      ({ type, site }) => (type === 'Trailer' || type === 'Teaser') && site === 'YouTube'
    );
  };

  useEffect(() => {
    document.title = `${title}- TvFlix`;
  }, [title]);

  return (
    <div className='movie_detail'>
      <div
        className='backdrop_image'
        style={{
          backgroundImage: `url(${imageBaseURL}${'w1280' || 'original'}${
            backdrop_path || poster_path
          })`,
        }}
      ></div>
      <figure className='poster_box movie_poster'>
        <img src={`${imageBaseURL}w342${poster_path}`} alt={title} className='img_cover' />
      </figure>
      <div className='detail_box'>
        <div className='detail_content'>
          <h1 className='heading'>{title}</h1>

          <div className='meta_list'>
            <div className='meta_item'>
              <img src={staticImages.rateStar} width='20' height='20' alt='Rating' />
              <span className='span'>{vote_average.toFixed(1)}</span>
            </div>
            <div className='separator'></div>
            <div className='meta_item'>{release_date.split('-')[0]}</div>
            <div className='separator'></div>
            <div className='meta_item'>{runtime} minutes</div>
            <div className='separator'></div>
            <div className='meta_item card_badge'>{certification}</div>
          </div>

          <p className='genre'>{genres.map(({ name }) => name).join(', ')}</p>

          <p className='over_view'>{overview}</p>

          <ul className='detail_list'>
            <div className='list_item'>
              <p className='list_name'>Starring</p>

              <p>
                {cast
                  .slice(0, 10)
                  .map(({ name }) => name)
                  .join(', ')}
              </p>
            </div>

            <div className='list_item'>
              <p className='list_name'>Directed by: </p>
              <p>{getDirector(crew)}</p>
            </div>
          </ul>
        </div>
        <div className='title_wrapper'>
          <h3 className='title_large'>Trailers and Clips</h3>
        </div>
        {/* CREATE YOUTUBE VIDEO  */}
        <div className='slider_list'>
          <div className='slider_inner'>
            {filterVideos(videos).map(({ key, name }, index) => {
              return (
                <div className='video_card' key={index}>
                  <iframe
                    src={`https://www.youtube.com/embed/${key}?&theme=dark&color=white&rel=0`}
                    width='500'
                    height='294'
                    frameBorder='0'
                    allowFullScreen='1'
                    title={name}
                    loading='lazy'
                    className='img_cover'
                  ></iframe>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieDetail;

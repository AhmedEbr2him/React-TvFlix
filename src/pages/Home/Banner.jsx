import { useState } from 'react';
import { api_key, imageBaseURL, fetchDataFromServe } from '../../api/api';
import { useEffect } from 'react';
import SliderItem from './SliderItem';

const Banner = () => {
  const [movieList, setMovieList] = useState([]);
  const initialActiveIndex = parseInt(sessionStorage.getItem('bannerIndex')) || 0;
  const [activeBannerIndex, setActiveBannerIndex] = useState(initialActiveIndex);

  const fetchData = async () => {
    fetchDataFromServe(
      `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page=1`,
      function (data) {
        setMovieList(data.results);
      }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* CREATE NEXT BANNER AS A CONTROLL ITEM */
  const handleSliderControlIndex = index => {
    setActiveBannerIndex(index);
    sessionStorage.setItem('bannerIndex', index);
  };

  return (
    <section className='banner' aria-label='Popular Movies'>
      <div className='banner_slider'>
        {movieList.map((movie, index) => (
          <SliderItem
            key={index}
            index={index}
            movie={movie}
            activeBannerIndex={activeBannerIndex}
          />
        ))}
      </div>

      <div className='slider_control'>
        <div className='control_inner'>
          {movieList.map((movie, index) => {
            const { poster_path, title } = movie;
            return (
              <div
                key={index}
                className={`poster_box slider_item ${index === activeBannerIndex ? 'active' : ''}`}
                onClick={() => handleSliderControlIndex(index)}
              >
                <img
                  src={`${imageBaseURL}w154${poster_path}`}
                  alt={`Slide to ${title}`}
                  loading='lazy'
                  draggable='false'
                  className='img_cover'
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Banner;

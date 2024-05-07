'use strict';

const api_key = 'a36a21dcbbdedaff96926c4fe84fa370';
const imageBaseURL = 'https://image.tmdb.org/t/p/';

const fetchDataFromServe = async (url, callback, optionalParam) => {
  const response = await fetch(url);
  const data = await response.json();

  if (response.ok) {
    callback(data, optionalParam);
  }
};

export { api_key, imageBaseURL, fetchDataFromServe };

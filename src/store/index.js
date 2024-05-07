import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSearchActive: false,
  isSidebarActive: false,
  isBannerActive: 0,
  isModalActive: false,
  isSearching: false,
  inputFieldValue: '',
  genreId: null,
  genreName: '',
};
const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setIsSearchActive: state => {
      state.isSearchActive = !state.isSearchActive;
    },
    setIsSidebarActive: state => {
      state.isSidebarActive = !state.isSidebarActive;
    },
    setGenre: (state, action) => {
      state.genreId = action.payload.genreId;
      state.genreName = action.payload.genreName;
    },
    setIsModalActive: (state, action) => {
      state.isModalActive = action.payload;
    },
    setIsSearching: (state, action) => {
      state.isSearching = action.payload;
    },
    setInputFieldValue: (state, action) => {
      state.inputFieldValue = action.payload;
    },
  },
});

export default movieSlice.reducer;
export const {
  setIsSearchActive,
  setIsSidebarActive,
  setIsModalActive,
  setIsSearching,
  setInputFieldValue,
  setGenre,
} = movieSlice.actions;

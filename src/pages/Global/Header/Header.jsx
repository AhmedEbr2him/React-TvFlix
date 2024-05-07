import './Header.css';
import { Link } from 'react-router-dom';
import { staticImages } from '../../../utils/images';
import { IoIosSearch, IoMdClose, IoMdMenu } from 'react-icons/io';
import { MdMenuOpen } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {
  setIsSearchActive,
  setIsSidebarActive,
  setIsModalActive,
  setIsSearching,
  setInputFieldValue,
} from '../../../store';

const Header = () => {
  const dispatch = useDispatch();
  const { isSearchActive, isSidebarActive, isSearching } = useSelector(state => state.movieReducer);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCloseSearch = () => {
    dispatch(setIsSearchActive());
    dispatch(setIsModalActive(false));
    dispatch(setIsSearching(false));
  };
  const handleCloseSearchKey = e => {
    if (e.key === 'Escape') {
      dispatch(setIsModalActive(false));
    }
  };
  const getSearchQuery = e => {
    setSearchQuery(e.target.value);
  };
  const handleSearchModalView = () => {
    dispatch(setInputFieldValue(searchQuery));
    if (!searchQuery) {
      dispatch(setIsModalActive(false));
      dispatch(setIsSearching(false));
    } else {
      dispatch(setIsModalActive(true));
      dispatch(setIsSearching(true));
    }
  };

  return (
    <header className='header'>
      <Link to='/' className='logo'>
        <img src={staticImages.logo} width='140' height='32' alt='Tvflix home' />
      </Link>

      <div className={`search_box ${isSearchActive ? 'active' : ''}`}>
        <div className={`search_wrapper ${isSearching ? 'searching' : ''}`}>
          <input
            type='text'
            name='search'
            className='search_field'
            aria-label='search movies'
            placeholder='Search any movies...'
            autoComplete='off'
            onChange={getSearchQuery}
            onInput={() => handleSearchModalView()}
            onKeyDown={e => handleCloseSearchKey(e)}
          />
          <IoIosSearch size='24' className='leading_icon' />
        </div>

        <button className='search_btn' onClick={() => handleCloseSearch()}>
          <IoMdClose size='24' />
        </button>
      </div>

      <button className='search_btn' onClick={() => handleCloseSearch()}>
        <IoIosSearch size='24' />
      </button>

      <button
        className={`menu_btn ${isSidebarActive ? 'active' : ''}`}
        onClick={() => dispatch(setIsSidebarActive())}
      >
        <IoMdMenu size='24' className='menu' />
        <MdMenuOpen size='24' className='close' />
      </button>
    </header>
  );
};
export default Header;

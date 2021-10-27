import PropTypes from 'prop-types';
import './Searchbar.css';

const Searchbar = ({ onSearch }) => {
  const onSearchBtnClick = e => {
    e.preventDefault();
    onSearch(e.target.elements.imageTags.value);
    e.target.reset();
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={onSearchBtnClick}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          name="imageTags"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Searchbar;

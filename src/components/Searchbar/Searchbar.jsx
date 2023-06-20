import React from 'react';
import css from './Searchbar.module.css';
import Notiflix from 'notiflix';
import PropTypes from "prop-types";

class Searchbar extends React.Component {
  state = {
    searchQuery: '',
}

handleQueryChange = evt => {
    this.setState({searchQuery: evt.currentTarget.value.toLowerCase()})
}

handleSubmit = evt => {
    evt.preventDefault();

    if(this.state.searchQuery.trim() === '') {
        Notiflix.Notify.warning("Please enter search query");
        return;
    }

    this.props.onSubmit(this.state.searchQuery)
    this.setState({searchQuery: ''})
}

render() {
    return (
        <header className={css.searchbar}>
        <form onSubmit={this.handleSubmit} className={css.form}>
        
          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleQueryChange}
            value={this.state.searchQuery}
          />
          <button type="submit" className={css.button}>
            <span className={css['button__label']}>Search</span>
          </button>
        </form>
      </header>
          )
};
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
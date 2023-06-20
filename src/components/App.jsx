import React from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import css from './App.module.css';

export class App extends React.Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    showModal: false,
    isEmpty: false,
    error: '',
    isLoading: false,
    showLoadMore: false,
    urlModal: '',
  };
  
  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const newQuery = this.state.searchQuery;
    const prevPage = prevState.page;
    const newPage = this.state.page;

    if (prevQuery !== newQuery || prevPage !== newPage) {
      this.handleGetImages(newQuery, newPage);
    }
  }

  handleFormSubmit = query => {
    this.setState({
      searchQuery: query,
      images: [],
      page: 1,
      showLoadMore: false,
      isEmpty: false,
      error: '',
    });
  };

  handleGetImages = (searchQuery, page) => {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '34311781-efd5fccfe1ca82ca08bcfd072';
    const url = `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
    this.setState({ isLoading: true });
    fetch(url)
      .then(response => response.json())
      .then(({ hits, totalHits }) => {
        if (!hits.length) {
          this.setState({
            isEmpty: true,
          });
          return;
        }
        this.setState({
          images: [...this.state.images, ...hits],
          showLoadMore: this.state.page < Math.ceil(totalHits / 12),
        });
      })
      .catch(error => {
        this.setState({ error: `${error}` });
      })
      .finally(() => this.setState({ isLoading: false }));
  };
  
  toggleOnLoading = () => {
    this.setState(({ isLoading }) => ({ isLoading: !isLoading }));
  };
  
  onLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };
  
  openModal = (url) => {
    this.setState(() => ({
      showModal: true,
      urlModal: url,
    }));
  };

  closeModal = () => {
    this.setState(() => ({
      showModal: false,
      urlModal: '',
    }));
  };

  render () {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleFormSubmit}/>
        <ImageGallery 
          images={this.state.images} openModal={this.openModal} toggleOnLoading={this.toggleOnLoading}
        />
        {this.state.showLoadMore && <Button onLoadMore={this.onLoadMore} />}
        {this.state.isLoading && <Loader />}
        {this.state.showModal && (
          <Modal onClose={this.closeModal}>
            <img
              onLoad={this.toggleOnLoading}
              src={this.state.urlModal}
              alt=""
              className={css['modal-img']}
            />
          </Modal>
        )}
      </div>
    );
  }
};

export default App;
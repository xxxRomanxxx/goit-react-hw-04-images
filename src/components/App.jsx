import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import css from './App.module.css';
import api from './Service/Service';
import Loader from './Loader/Loader';
import Notiflix from 'notiflix';

export default function App() {

  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [urlModal, setUrlModal] = useState('');
  const [tags, setTags] = useState('');

  const handleFormSubmit = query => {
    setSearchQuery(query);
    setImages([]);
    setPage(1);
    setShowLoadMore(false);
  };
  
  const handleGetImages = async (searchQuery, page) => {
    setIsLoading(true);
    
    try {
      const response = await api.fetchApi(searchQuery, page);

      if (response.totalHits === 0) {
        Notiflix.Notify.warning(`Nothing was found for ${searchQuery}`)
      }
      setImages((prevImages) => [...prevImages, ...response.hits]);
      setShowLoadMore(page < Math.ceil(response.totalHits / 12));
    } catch (error) {
      Notiflix.Notify.failure('Sorry, something went wrong!');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    
  };
  
  useEffect(() => {
    if (searchQuery !== '') {
      handleGetImages(searchQuery, page);
    }
  }, [searchQuery, page]);
  
  const onLoadMore = () => {
    setPage(page + 1);
  };
  
  const openModal = (url, tags) => {
    setShowModal(true);
    setUrlModal(url);
    setTags(tags);
  };

  const closeModal = () => {
    setShowModal(false);
    setUrlModal('');
    setTags('');
  };

    return (
      <div className={css.app}>
        <Searchbar onSubmit={handleFormSubmit}/>
        <ImageGallery 
          images={images} openModal={openModal}
        />
        {showLoadMore && <Button onLoadMore={onLoadMore} />}
        {isLoading && <Loader />}
        {showModal && (
          <Modal onClose={closeModal}>
            <img
              src={urlModal}
              alt={tags}
              className={css['modal-img']}
            />
          </Modal>
        )}
      </div>
    );
};
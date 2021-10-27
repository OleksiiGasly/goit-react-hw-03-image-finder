import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import fetchImages from './utils/api';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import { Modal } from './components/Modal/Modal';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import './App.css';

class App extends Component {
  state = {
    imageTags: '',
    page: 1,
    gallery: [],
    requestStatus: 'idle',
    showModal: false,
    largeImageURL: '',
    tags: '',
  };

  handleFormSubmit = imageTags => {
    this.setState({ page: 1, gallery: [], imageTags });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleSelectedImage = (largeImageURL, tags) => {
    this.setState({ largeImageURL, tags });
    this.toggleModal();
  };

  handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  async componentDidUpdate(_, prevState) {
    const { imageTags, page } = this.state;

    if (prevState.imageTags !== imageTags || prevState.page !== page)
      try {
        this.setState({ requestStatus: 'pending' });
        const gallery = await fetchImages(imageTags, page);

        this.setState(
          prevState => ({
            gallery: [...prevState.gallery, ...gallery],
            requestStatus: 'resolved',
          }),
          () => {
            this.handleScroll();
          },
        );
        if (gallery.length === 0) {
          return toast(
            'Sorry, there are no images matching your search query. Please try again.',
          );
        }
      } catch (error) {
        console.log(error);
      }
  }

  render() {
    const { gallery, showModal, largeImageURL, imageTags, requestStatus } =
      this.state;
    const isLoading = requestStatus === 'pending';
    const showGallery = gallery.length > 0 && !isLoading;

    return (
      <div>
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            largeImageURL={largeImageURL}
            alt={imageTags}
          />
        )}
        <Searchbar onSearch={this.handleFormSubmit} />
        {isLoading && (
          <Loader
            type="Puff"
            color="#eb8634"
            height={84}
            width={84}
            style={{
              marginLeft: '666px',
              marginTop: '20px',
              marginBottom: '20px',
            }}
            timeout={2000}
          />
        )}
        <ImageGallery
          gallery={gallery}
          handleSelectedImage={this.handleSelectedImage}
        />
        {showGallery && <Button handleLoadMore={this.handleLoadMore} />}
        <Toaster position="top-right" />
      </div>
    );
  }
}

export default App;

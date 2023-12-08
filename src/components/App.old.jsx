import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './GlobalStyle';
import { fetchImages, sortedImages } from './Api';
import { Container, Empty } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Loader } from './Loader/Loader';
import { SearchBar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    images: [],
    searchImg: '',
    page: 1,
    totalPages: 0,
    isLoading: false,
    error: null,
  };

  componentDidUpdate(prevProps, PrevState) {
    if (
      PrevState.searchImg !== this.state.searchImg ||
      PrevState.page !== this.state.page
    ) {
      this.renderImages();
    }
  }

  handleSubmit = query => {
    if (this.state.searchImg === query) {
      return toast.error(`You are already browsing ${query}`);
    }
    this.setState({
      searchImg: query,
      images: [],
      page: 1,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  renderImages = async () => {
    const { searchImg, page } = this.state;

    try {
      this.setState({ isLoading: true });
      const data = await fetchImages(searchImg, page);
      if (data.hits.length === 0) {
        return toast.error('Sorry image not found!');
      }
      const normalizedImg = sortedImages(data.hits);

      this.setState(state => ({
        images: [...state.images, ...normalizedImg],
        isLoading: false,
        error: '',
        totalPages: Math.ceil(data.totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error: 'Something went wrong!' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { images, isLoading, page, totalPages } = this.state;
    return (
      <Container>
        <SearchBar onSubmit={this.handleSubmit} />
        {images.length > 0 ? (
          <ImageGallery images={images} />
        ) : (
          <Empty>Gallery is empty</Empty>
        )}
        {isLoading && <Loader />}
        {images.length > 0 && totalPages !== page && !isLoading && (
          <Button onClick={this.loadMore} />
        )}
        <Toaster />
        <GlobalStyle />
      </Container>
    );
  }
}

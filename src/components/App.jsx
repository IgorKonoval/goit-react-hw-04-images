import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './GlobalStyle';
import { fetchImages, sortedImages } from './Api';
import { Container, Empty } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Loader } from './Loader/Loader';
import { SearchBar } from './Searchbar/Searchbar';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchImg, setSearchImg] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchImg || !page) {
      return;
    }
    const renderImages = async () => {
      try {
        setIsLoading(true);
        const data = await fetchImages(searchImg, page);
        if (data.hits.length === 0) {
          return toast.error('Sorry image not found!');
        }
        const normalizedImg = sortedImages(data.hits);
        setImages(prevState => [...prevState, ...normalizedImg]);
        setIsLoading(false);
        setTotalPages(Math.ceil(data.totalHits / 12));
      } catch (error) {
        toast.error('Something went wrong!');
      } finally {
        setIsLoading(false);
      }
    };
    renderImages();
  }, [page, searchImg]);

  const handleSubmit = query => {
    if (searchImg === query) {
      return toast.error(`You are already browsing ${query}`);
    }
    setSearchImg(query);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <Container>
      <SearchBar onSubmit={handleSubmit} />
      {images.length > 0 ? (
        <ImageGallery images={images} />
      ) : (
        <Empty>Gallery is empty</Empty>
      )}
      {isLoading && <Loader />}
      {images.length > 0 && totalPages !== page && !isLoading && (
        <Button onClick={loadMore} />
      )}
      <Toaster />
      <GlobalStyle />
    </Container>
  );
};

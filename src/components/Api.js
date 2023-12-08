import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '41091285-46f99b835f857152712f90426';

export const fetchImages = async (query, currentPage) => {
  const { data } = await axios.get(
    `/?q=${query}&page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
};

export const sortedImages = array =>
  array.map(({ id, tags, webformatURL, largeImageURL }) => {
    return { id, tags, webformatURL, largeImageURL };
  });

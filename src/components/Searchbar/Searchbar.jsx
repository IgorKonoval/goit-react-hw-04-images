import { useState } from 'react';
import { FcSearch } from 'react-icons/fc';
import {
  SearchBarHeader,
  SearchForm,
  SearchInput,
  SearchButton,
} from './Searchbar.styled';

export const SearchBar = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(evt.target.elements.searchItem.value.trim());
    evt.target.reset();
  };

  const handleChange = evt => {
    setInput(evt.target.value);
  };

  return (
    <SearchBarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton>
          <FcSearch size="30px" />
        </SearchButton>
        <SearchInput
          name="searchItem"
          type="text"
          id="search"
          value={input}
          onChange={handleChange}
        />
      </SearchForm>
    </SearchBarHeader>
  );
};

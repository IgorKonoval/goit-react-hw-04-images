import React, { useState } from 'react';
import { FcSearch } from 'react-icons/fc';
import {
  SearchBarHeader,
  SearchForm,
  SearchInput,
  SearchButton,
} from './Searchbar.styled';

export const SearchBar = ({ onSubmit }) => {
  const [searchItem, setSearchItem] = useState('');
  const [input, setInput] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    setSearchItem(input.trim());
    onSubmit(searchItem);
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

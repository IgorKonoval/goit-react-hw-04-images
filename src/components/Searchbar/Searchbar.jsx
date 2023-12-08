import React, { Component } from 'react';
import { FcSearch } from 'react-icons/fc';
import {
  SearchBarHeader,
  SearchForm,
  SearchInput,
  SearchButton,
} from './Searchbar.styled';

export class SearchBar extends Component {
  state = {
    searchItem: '',
    input: '',
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const searchQuery = evt.target.elements.searchItem.value.trim();
    this.props.onSubmit(searchQuery);
    evt.target.reset();
  };

  handleChange = evt => {
    this.setState({ input: evt.target.value });
  };
  
  render() {
    return (
      <SearchBarHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton>
            <FcSearch size="30px" />
          </SearchButton>
          <SearchInput
            name="searchItem"
            type="text"
            id="search"
            value={this.state.input}
            onChange={this.handleChange}
          />
        </SearchForm>
      </SearchBarHeader>
    );
  }
}

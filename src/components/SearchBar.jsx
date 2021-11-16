import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SearchBar = ({ setPokemonSearchValue }) => {
  const [searchValue, setSearchValue] = useState("");
  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  }
  const onClickSearch = () => {
    setPokemonSearchValue(searchValue);
  }
  return (
    <SearchBarWrapper>
      <InputBar
        type="text"
        placeholder="find your pokemon"
        value={searchValue}
        onChange={onChangeSearchValue}
        />
      <SearchButton onClick={onClickSearch}>Search</SearchButton>
    </SearchBarWrapper>
  )
}

SearchBar.propTypes = {
  setPokemonSearchValue: PropTypes.func.isRequired,
}

export default SearchBar;

const SearchBarWrapper = styled.div`
  width: 300px;
  height: 30px;
  margin: 10px auto;
  display: flex;
`;

const InputBar = styled.input`
  width: 250px;
  height: 30px;
  border: 1px solid #cfcfcf;
  padding: 3px;
  box-sizing: border-box;
`;

const SearchButton = styled.button`
  width: 50px;
  height: 30px;
  padding: 3px;
  background-color: teal;
  border: 0;
  box-sizing: border-box;
  color: #ffffff;
`;
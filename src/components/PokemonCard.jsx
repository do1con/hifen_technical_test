import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PokemonCard = ({ pokemonId, pokemonName }) => {
  return (
    <PokemonCardWrapper>
      <PokemonImage
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonId}.png`}
        alt={pokemonName}
        width={90}
      />
      <PokemonName>{pokemonName}</PokemonName>
    </PokemonCardWrapper>
  )
}

PokemonCard.propTypes = {
  pokemonId: PropTypes.number.isRequired,
  pokemonName: PropTypes.string.isRequired,
}

export default PokemonCard;

const PokemonCardWrapper = styled.div`
  width: calc(50% - 12px);
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  height: 100px;
  display: flex;
  margin: 10px 0;
  box-shadow: 0px 5px 12px 0px rgba(0, 0, 0, .2);
  align-items: center;
  cursor: pointer;
`;

const PokemonImage = styled.img`
  padding: 5px;
`;

const PokemonName = styled.h2`
  font-size: 20px;
  font-weight: lighter;
  margin-left: 20px;
`;
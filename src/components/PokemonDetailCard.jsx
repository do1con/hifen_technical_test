import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PokemonDetailCard = ({ details, pokemonDescription, setShowDetail }) => {


  const onClickBlackArea = (event) => {
    if (event.target.className !== event.currentTarget.className) return false;
    setShowDetail("");
  }

  return (
    <PokemonDetailWrapper onClick={onClickBlackArea}>
      {(details.sprites && pokemonDescription) &&
        <PokemonDetailCardBox>
          <CloseButton onClick={() => setShowDetail("")}>X</CloseButton>
          <TitleSectionDiv>
            <div>
              <PokemonImage
                src={details.sprites.other.home.front_default}
                alt={details.name + "image"}
                width={100}
              />
            </div>
            <div>
              <PokemonName>{details.name}</PokemonName>
            </div>
            <div>
              <h3>Type</h3>
              <br />
              {details.types.map((data, index) =>
                <Attribute key={index}>{data.type.name}</Attribute>
              )}
            </div>
          </TitleSectionDiv>
          <hr />
          <p>
            Characteristic: {pokemonDescription} <br />
          </p>
          <hr />
          <div>
            <h3>Abilities</h3>
            {details.abilities.map((data, index) =>
              <Attribute key={index}>{data.ability.name}</Attribute>
            )}
          </div>
        </PokemonDetailCardBox>
      }
    </PokemonDetailWrapper>
  )
}

PokemonDetailCard.propTypes = {
  details: PropTypes.object,
  description: PropTypes.array,
  setShowDetail: PropTypes.func.isRequired,
}

export default PokemonDetailCard;

const PokemonDetailWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2;
`;

const PokemonDetailCardBox = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  @media screen and (max-width: 620px) {
    width: 300px;
  }
  height: 400px;
  background-color: #ffffff;
  z-index: 3;
  padding: 20px;
  box-sizing: border-box;
`;

const PokemonName = styled.h2`
  font-weight: bolder;
  font-size: 22px;
  @media screen and (max-width: 620px) {
    font-size: 16px;
  }
`;

const TitleSectionDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const PokemonImage = styled.img`
  padding: 10px;
`;

const Attribute = styled.span`
  background-color: #cfcfcf;
  padding: 5px;
  margin: 5px;
  font-size: 16px;
  @media screen and (max-width: 620px) {
    padding: 3px;
    margin: 3px;
    font-size: 14px;
  }
`;

const CloseButton = styled.button`
  border: 0;
  background-color: rgba(0,0,0,0);
  font-size: 24px;
  font-weight: bolder;
  color: #000000;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
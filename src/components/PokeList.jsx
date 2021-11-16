import React, { useState, useEffect } from 'react';
import { Pokedex as Poke } from 'pokeapi-js-wrapper';
import styled from 'styled-components';
import Pagenation from './Pagenation';
import PokemonCard from './PokemonCard';

const PokeList = () => {
  const Pokedex = new Poke();
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const getPokemons = async () => {
    const result = await Pokedex.getPokemonsList({
      limit: 10,
      offset: (currentPage - 1) * 10,
    });
    setPokemonList(result.results);
    setMaxPage(Math.ceil(result.count / 10)); // 1 page 10 pokemons
    console.log('포키몬', result.results);
  }
  useEffect(() => {
    getPokemons();
  }, []);
  useEffect(() => {
    getPokemons();
  }, [currentPage]);
  return (
    <div>
      <PokeListWrapper>
          {pokemonList.map((data) => {
            const id = Number(data.url.replace(/[^0-9]/g,"").slice(1));
            console.log('id', id);
            return <PokemonCard pokemonId={id} pokemonName={data.name} />
          })
          }
      </PokeListWrapper>
      <Pagenation currentPage={currentPage} setCurrentPage={setCurrentPage} maxPage={maxPage} />
    </div>
  )
}

export default PokeList;

const PokeListWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
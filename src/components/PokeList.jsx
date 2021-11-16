import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Pokedex as Poke } from 'pokeapi-js-wrapper';
import styled from 'styled-components';
import Pagenation from './Pagenation';
import PokemonCard from './PokemonCard';
import PokemonDetailCard from './PokemonDetailCard';
import SearchBar from './SearchBar';

const PokeList = () => {
  const Pokedex = useMemo(() => new Poke(), []);
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [showDetail, setShowDetail] = useState("");
  const [pokemonDetail, setPokemonDetail] = useState({});
  const [pokemonDescription, setPokemonDescription] = useState("");
  const [pokemonSearchValue, setPokemonSearchValue] = useState("");
  const [notFoundOnSearch, setNotFoundOnSearch] = useState(false);
  const getPokemons = useCallback(async () => {
    const result = await Pokedex.getPokemonsList({
      limit: 10,
      offset: (currentPage - 1) * 10,
    });
    setPokemonList(result.results);
    setMaxPage(Math.ceil(result.count / 10)); // 1 page 10 pokemons
  }, [Pokedex, currentPage])
  const getPokemonDetail =  useCallback(async () => {
    setPokemonDetail({loading: "loading..."});
    setPokemonDescription("loading...");
    if(showDetail) {
      const detailResult = await Pokedex.getPokemonByName(showDetail);
      const descriptionResult = await Pokedex.getPokemonSpeciesByName(showDetail);
      const englishDescription = descriptionResult.flavor_text_entries.filter(
        (data) => data.language.name === 'en' ? true : false
      )
      setPokemonDetail(detailResult);
      setPokemonDescription(englishDescription[0].flavor_text)
    }
  }, [Pokedex, showDetail]);
  const searchPokemonByValue =  useCallback(async () => {
    if (pokemonSearchValue === "") {
      getPokemons();
      setNotFoundOnSearch(false);
      return;
    }
    try{
      const result = await Pokedex.getPokemonByName(pokemonSearchValue);
      setPokemonList([{
        name: result.name,
        url: result.species.url
      }]);
      setNotFoundOnSearch(false);
      setMaxPage(1);
    } catch {
      setNotFoundOnSearch(true);
      setPokemonList([]);
      setMaxPage(1);
    }
  }, [Pokedex, getPokemons, pokemonSearchValue]);
  useEffect(() => {
    getPokemons();
  }, [getPokemons]);
  useEffect(() => {
    getPokemons();
  }, [currentPage, getPokemons]);
  useEffect(() => {
    getPokemonDetail();
  }, [getPokemonDetail, showDetail]);
  useEffect(() => {
    searchPokemonByValue();
  }, [pokemonSearchValue, searchPokemonByValue])
  
  return (
    <div>
      <SearchBar setPokemonSearchValue={setPokemonSearchValue} />
      <PokeListWrapper>
          {pokemonList.map((data) => {
            const id = Number(data.url.replace(/[^0-9]/g,"").slice(1));
            return (
            <PokemonCard
              pokemonId={id}
              pokemonName={data.name}
              setShowDetail={setShowDetail}
              key={id}
            />)
          })}
      </PokeListWrapper>
      <Pagenation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        maxPage={maxPage}
      />
      {showDetail !== "" &&
        <PokemonDetailCard
          details={pokemonDetail}
          setShowDetail={setShowDetail}
          pokemonDescription={pokemonDescription}
        />
      }
      <PokeListWrapper>
        {pokemonDescription === "loading..." && <LoadingScreen>loading...</LoadingScreen>}
        {notFoundOnSearch && (
          <div>
            <p>There is no Pokemon you are looking for...</p>
            <p>Search blank to return</p>
          </div>
        )}
      </PokeListWrapper>
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

const LoadingScreen = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  font-size: 32px;
  z-index: 4;
`;

import React from 'react'
import { Row, Column, PokemonDetailsContainer, ReturnToPage, PokemonInfo, PokemonInfoLabel, PokemonInfoHeader, PokemonInfoRow } from './StyledComponents'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { toTitleCase, maxStatMapping } from '../utils'
import { Line } from 'rc-progress'

export default (props) => {
  const { clearSelectedPokemon, pokemon } = props
  return (
    <Column padding='0 20px'>
      <ReturnToPage onClick={clearSelectedPokemon}><FontAwesomeIcon icon={faArrowLeft} />&nbsp;Return to Pokedéx</ReturnToPage>
      <PokemonDetailsContainer>
        <Row justifyContent='space-between'>
          <Column width='40%'>
            <PokemonInfoHeader margin='0 0 0 20px' alignSelf='left'>{toTitleCase(pokemon.name)}</PokemonInfoHeader>
            <img width='156px' height='156px' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={pokemon.name} />
            <PokemonInfo margin='0 0 0 20px'>Pokémon ID #{pokemon.id}</PokemonInfo>
            <Column margin='30px 0 0 0'>
              <PokemonInfoHeader>Shiny</PokemonInfoHeader>              
              <img width='156px' height='156px' src={pokemon.sprites.front_shiny} alt={`shiny_${pokemon.name}`}/>
            </Column> 
          </Column>
          <Column>
            <PokemonInfoHeader>Base Stats</PokemonInfoHeader>
            {pokemon.stats.map(stat => {
              return <Column key={stat.stat.name}>
                <PokemonInfo margin='10px 0'>{toTitleCase(stat.stat.name).replace('-', ' ')}</PokemonInfo>
                <Line strokeWidth='2' trailWidth='1' strokeColor='#4A5D3E' percent={stat.base_stat / maxStatMapping[stat.stat.name] * 100} />
              </Column>
            }
            )}
          </Column>
        </Row>
        <Column margin='30px 0'>
          <PokemonInfoHeader>Profile</PokemonInfoHeader>  
          <Row>
            <Column>
              <PokemonInfoRow><PokemonInfoLabel>Types:</PokemonInfoLabel><PokemonInfo>{pokemon.types.map(type => toTitleCase(type.type.name)).join(', ')}</PokemonInfo></PokemonInfoRow>
              <PokemonInfoRow><PokemonInfoLabel>Abilities:</PokemonInfoLabel><PokemonInfo>{pokemon.abilities.map(ability => toTitleCase(ability.ability.name)).join(', ')}</PokemonInfo></PokemonInfoRow>
            </Column>
            <Column>
              <PokemonInfoRow><PokemonInfoLabel>Weight:</PokemonInfoLabel><PokemonInfo>{pokemon.weight}lb</PokemonInfo></PokemonInfoRow>
              <PokemonInfoRow><PokemonInfoLabel>Height:</PokemonInfoLabel><PokemonInfo>{pokemon.height}ft</PokemonInfo></PokemonInfoRow>
            </Column>
            <Column>
              <PokemonInfoRow><PokemonInfoLabel>Base Experience:</PokemonInfoLabel><PokemonInfo>{pokemon.base_experience} EXP</PokemonInfo></PokemonInfoRow>
            </Column>
          </Row>         
        </Column>
      </PokemonDetailsContainer>
    </Column>
  )
}
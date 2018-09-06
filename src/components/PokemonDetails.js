import React from 'react'
import { Row, Column, PokemonDetailsContainer, ReturnToPage, PokemonInfo, PokemonInfoLabel, PokemonInfoHeader, PokemonInfoRow } from './StyledComponents'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { toTitleCase, maxStatMapping } from '../utils'
import { Line } from 'rc-progress'

export default (props) => {
  const { clearSelectedPokemon, pokemon } = props
  console.log(props)
  return (
    <Column>
      <ReturnToPage onClick={clearSelectedPokemon}><FontAwesomeIcon icon={faArrowLeft} />&nbsp;Return to Pokedéx</ReturnToPage>
      <PokemonDetailsContainer>
        <Row justifyContent='space-between'>
          <Column width='40%'>
            <PokemonInfoHeader margin='0 0 0 20px' alignSelf='left'>{toTitleCase(pokemon.name)}</PokemonInfoHeader>
            <img width='156px' height='156px' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} />
            <PokemonInfo margin='0 0 0 20px'>Pokémon ID #{pokemon.id}</PokemonInfo>
          </Column>
          <Column>
            <PokemonInfoHeader>Base Stats</PokemonInfoHeader>
            {pokemon.stats.map(stat => {
              return <Column key={stat.stat.name}>
                <PokemonInfo margin='10px 0'>{toTitleCase(stat.stat.name)}</PokemonInfo>
                <Line strokeWidth='2' trailWidth='1' strokeColor='#1C148A' percent={stat.base_stat / maxStatMapping[stat.stat.name] * 100} />
              </Column>
            }
            )}
          </Column>
        </Row>
        <Column margin='20px'>
          <PokemonInfoHeader>Profile</PokemonInfoHeader>  
          <Row>
            <Column>
              <PokemonInfoRow><PokemonInfoLabel>Weight:</PokemonInfoLabel><PokemonInfo>{pokemon.weight}lb</PokemonInfo></PokemonInfoRow>
              <PokemonInfoRow><PokemonInfoLabel>Height:</PokemonInfoLabel><PokemonInfo>{pokemon.height}ft</PokemonInfo></PokemonInfoRow>
              <PokemonInfoRow><PokemonInfoLabel>Base Experience:</PokemonInfoLabel><PokemonInfo>{pokemon.base_experience} EXP</PokemonInfo></PokemonInfoRow>
            </Column>
            <Column>
            </Column>
          </Row>          
        </Column>
      </PokemonDetailsContainer>
    </Column>
  )
}
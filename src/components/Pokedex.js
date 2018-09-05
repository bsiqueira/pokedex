import React, {Component} from 'react'
import { get } from 'superagent'
import PokemonPage from './PokemonPage'
import { Header, Column, Row, StyledSelect, PokemonCard } from './StyledComponents'
import { toTitleCase } from '../utils'
import { SpringGrid } from 'react-stonecutter'

// Won't be using any kind of state management, app is just too simple for it
export default class Pokedex extends Component {
  constructor (props) {
    super(props)  
    this.state = {
      pokemons: [],
      pokemonOptions: [],
      selectedPokemon: null,
      pokemonSearchValue: '',
    }
  }
  
  componentDidMount = () => {
    fetchPokemons().then(pokemons => {
      this.setState({
        pokemons: pokemons.map(pokemon => ({
          ...pokemon,
          name: toTitleCase(pokemon.name)
        })),
        pokemonOptions: pokemons.map(pokemon => ({label: pokemon.name, value: pokemon}))
      })
    })
  }
  
  handleClickPokemon = (id) => fetchPokemon(id).then(result => this.setState({selectedPokemon: result}))

  handleSearchPokemon = ({name}) => this.setState({pokemonSearchValue: name})
 
  render = () => {
    const { selectedPokemon, pokemons, pokemonOptions, pokemonSearchValue } = this.state
    console.log(pokemonSearchValue)
    // On a bigger application this should be handled with a router, and when loading the page with the selected id as the route param the respective api calls would be made
    return (
      <Column background='#e1e1ea'>
        <Header>Pokédex</Header>
      {selectedPokemon ?
        <PokemonPage /> :
        <PokedexSearchableGrid 
          pokemons={pokemons}
          pokemonOptions={pokemonOptions}
          onSelectPokemon={this.handleClickPokemon}
          onSearchPokemon={this.handleSearchPokemon}
          pokemonSearchValue={pokemonSearchValue}
        />
      }
      </Column>
    )
  }
}

{/*This would normally be a pure component to be wrapped around specific use cases.*/}
const PokedexSearchableGrid = (props) => {
  const { pokemons, pokemonOptions, onSelectPokemon, onSearchPokemon, pokemonSearchValue } = props
  return (
    <Column padding='0 20px'>
      <StyledSelect 
        placeholder='Search for pokémons'
        options={pokemonOptions}
        onChange={onSearchPokemon}
        value={pokemonSearchValue}
      />
      <SpringGrid
        component="ul"
        columns={6}
        columnWidth={150}
        gutterWidth={15}
        gutterHeight={15}
        itemHeight={200}
        springConfig={{ stiffness: 170, damping: 26 }}
      >
        {
          /**This should really not be done in a higher load scenario. On the fly filtering should be memoized through something like reselect */
          pokemons.filter(pokemon => pokemon.name.includes(pokemonSearchValue)).map(pokemon => {
            return (
              <div key={pokemon.name} itemHeight={180} itemWidth={130}>
                <PokemonCard>
                  {pokemon.name}
                </PokemonCard>
              </div>
            )
          })
        }
      </SpringGrid>
    </Column>
  )
}
// Generally wouldn't be making API calls inside components, but since this is just a small app using vanilla React we can get away with it.
// There is a point to make about using a static data source for this, since it's the kind of data that's not prone to changes. Will only use the API for demonstration purposes.
const fetchPokemons = () => get('https://pokeapi.co/api/v2/pokemon').query({limit: 151}).then(res => res.body.results).catch(err => console.log(err))
const fetchPokemon = (id) => get(`http://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.body).catch(err => console.log(err))
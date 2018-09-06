import React, {Component} from 'react'
import { get } from 'superagent'
import PokemonPage from './PokemonDetails'
import { Header, Column, StyledSelect, PokemonCard, PokemonGrid, Span } from './StyledComponents'
import { toTitleCase } from '../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { easings } from 'react-stonecutter'
import 'react-select/dist/react-select.css'

// Won't be using any kind of state management, app is just too simple for it
export default class Pokedex extends Component {
  constructor (props) {
    super(props)  
    this.state = {
      pokemons: [],
      pokemonOptions: [],
      selectedPokemon: null,
      pokemonSearchValue: '',
      fetchingPokemon: '',
    }
  }
  
  componentDidMount = () => {
    fetchPokemons().then(pokemons => {
      this.setState({
        pokemons: pokemons.map(pokemon => ({
          ...pokemon,
          name: toTitleCase(pokemon.name),
          id: pokemon.url.substr(0, pokemon.url.length - 1).split("/").pop()
        })),
        pokemonOptions: pokemons.map(pokemon => ({label: toTitleCase(pokemon.name), value: pokemon}))
      })
    })
  }
  
  handleClickPokemon = (id) => () => {
    this.setState({fetchingPokemon: id})
    fetchPokemon(id).then(result => this.setState({selectedPokemon: result, fetchingPokemon: ''}))
  }

  clearSelectedPokemon = () => this.setState({selectedPokemon: null, pokemonSearchValue: ''})

  handleInputSearchPokemon = (pokemonSearchValue) => this.setState({pokemonSearchValue})

  handleSearchPokemon = ({label}) => this.setState({pokemonSearchValue: label})
  
 
  render = () => {
    const { selectedPokemon, pokemons, pokemonOptions, pokemonSearchValue, fetchingPokemon } = this.state
    // On a bigger application this should be handled with a router, and when loading the page with the selected id as the route param the respective api calls would be made
    return (
      <Column>
        <Header>Pokédex</Header>
      {selectedPokemon ?
        <PokemonPage pokemon={selectedPokemon} clearSelectedPokemon={this.clearSelectedPokemon} /> :
        <PokedexSearchableGrid 
          pokemons={pokemons}
          pokemonOptions={pokemonOptions}
          handleClickPokemon={this.handleClickPokemon}
          handleSearchPokemon={this.handleSearchPokemon}
          handleInputSearchPokemon={this.handleInputSearchPokemon}
          pokemonSearchValue={pokemonSearchValue}
          fetchingPokemon={fetchingPokemon}
        />
      }
      </Column>
    )
  }
}

// This would normally be a pure component to be wrapped around specific use cases
const PokedexSearchableGrid = (props) => {
  const { pokemons, pokemonOptions, handleClickPokemon, handleSearchPokemon, handleInputSearchPokemon, pokemonSearchValue, fetchingPokemon } = props
  return (
    <Column animate>
      <StyledSelect 
        placeholder='Search for a pokémon'
        options={pokemonOptions}
        onChange={handleSearchPokemon}
        onInputChange={handleInputSearchPokemon}
        inputValue={pokemonSearchValue}
        onBlurResetsInput={false}
        onBlur={() => {}}
      />
      <PokemonGrid
        component="ul"
        columnWidth={160}
        gutterWidth={15}
        gutterHeight={15}
        itemHeight={180}
        duration={700}
        easing={easings.easeInOut}
      >
        {
          /**This should really not be done in a higher load scenario. On the fly filtering should be memoized through something like reselect */
          pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(pokemonSearchValue.toLowerCase())).map(pokemon => {
            return (
              <div key={pokemon.name} itemHeight={180}>
                <PokemonCard onClick={handleClickPokemon(pokemon.id)}>
                  <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={pokemon.name} />
                  <div>{pokemon.name}{fetchingPokemon === pokemon.id && <Span margin='0 0 0 10px'><FontAwesomeIcon icon={faSpinner} spin /></Span>}</div>
                </PokemonCard>
              </div>
            )
          })
        }
      </PokemonGrid>
    </Column>
  )
}
// Generally wouldn't be making API calls inside components, but since this is just a small app using vanilla React we can get away with it.
// There is a point to make about using a static data source for this, since it's the kind of data that's not prone to changes. Will only use the API for demonstration purposes.
const fetchPokemons = () => get('https://pokeapi.co/api/v2/pokemon').query({limit: 151}).then(res => res.body.results).catch(err => console.log(err))
const fetchPokemon = (id) => get(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.body).catch(err => console.log(err))
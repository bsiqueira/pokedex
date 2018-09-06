import React, {Component} from 'react'
import { get } from 'superagent'
import PokemonPage from './PokemonPage'
import { Header, Column, Row, StyledSelect, PokemonCard } from './StyledComponents'
import { toTitleCase } from '../utils'
import { SpringGrid, makeResponsive } from 'react-stonecutter'

const Grid = makeResponsive(SpringGrid, { maxWidth: 1820 })

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
          name: toTitleCase(pokemon.name),
          id: pokemon.url.substr(0, pokemon.url.length - 1).split("/").pop()
        })),
        pokemonOptions: pokemons.map(pokemon => ({label: toTitleCase(pokemon.name), value: pokemon}))
      })
    })
  }
  
  handleClickPokemon = (id) => fetchPokemon(id).then(result => this.setState({selectedPokemon: result}))

  handleInputSearchPokemon = (pokemonSearchValue) => this.setState({pokemonSearchValue})

  handleSearchPokemon = ({label}) => this.setState({pokemonSearchValue: label})
  
 
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
          handleSelectPokemon={this.handleClickPokemon}
          handleSearchPokemon={this.handleSearchPokemon}
          handleInputSearchPokemon={this.handleInputSearchPokemon}
          pokemonSearchValue={pokemonSearchValue}
        />
      }
      </Column>
    )
  }
}

{/*This would normally be a pure component to be wrapped around specific use cases.*/}
const PokedexSearchableGrid = (props) => {
  const { pokemons, pokemonOptions, handleSelectPokemon, handleSearchPokemon, handleInputSearchPokemon, pokemonSearchValue } = props
  console.log(pokemonSearchValue)
  return (
    <Column padding='0 20px'>
      <StyledSelect 
        placeholder='Search for a pokémon'
        options={pokemonOptions}
        onChange={handleSearchPokemon}
        onInputChange={handleInputSearchPokemon}
        inputValue={pokemonSearchValue}
        searchable={false}
      />
      <Grid
        component="ul"
        columns={6}
        columnWidth={150}
        gutterWidth={15}
        gutterHeight={15}
        itemHeight={180}
        springConfig={{ stiffness: 170, damping: 26 }}
      >
        {
          /**This should really not be done in a higher load scenario. On the fly filtering should be memoized through something like reselect */
          pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(pokemonSearchValue.toLowerCase())).map(pokemon => {
            return (
              <div key={pokemon.name} itemHeight={180}>
                <PokemonCard>
                  {/* I admit that I kind of cheated on this one. I couldn't hot link all the images from their API, 
                so I'd either have to setup a server to download and cache them, or just take their pngs instead. */}
                  <img src={`images/pokemonSprites/${pokemon.id}.png`} alt={pokemon.name} />
                  <div>{pokemon.name}</div>
                </PokemonCard>
              </div>
            )
          })
        }
      </Grid>
    </Column>
  )
}
// Generally wouldn't be making API calls inside components, but since this is just a small app using vanilla React we can get away with it.
// There is a point to make about using a static data source for this, since it's the kind of data that's not prone to changes. Will only use the API for demonstration purposes.
const fetchPokemons = () => get('https://pokeapi.co/api/v2/pokemon').query({limit: 151}).then(res => res.body.results).catch(err => console.log(err))
const fetchPokemon = (id) => get(`http://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.body).catch(err => console.log(err))
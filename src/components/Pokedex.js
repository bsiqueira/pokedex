import React, {Component} from 'react'
import { get } from 'superagent'
import PokemonPage from './PokemonPage'
import { Header, Column, Row, StyledSelect } from './StyledComponents'

// Won't be using any kind of state management, app is just too simple for it
export default class Pokedex extends Component {
  constructor (props) {
    super(props)  
    this.state = {
      pokemonOptions: [],
      typeOptions: [],
      selectedPokemon: null,
    }
  }
  
  componentDidMount = () => {
    fetchPokemonOptions().then(pokemonOptions => {
      this.setState({
        pokemonOptions: pokemonOptions,
      })
    })
  }
  
  handleClickPokemon = (id) => fetchPokemon(id).then(result => this.setState({selectedPokemon: result}))
 
  render = () => {
    const { selectedPokemon, pokemonOptions } = this.state
    // On a bigger application this should be handled with a router, and when loading the page with the selected id as the route param the respective api calls would be made
    return (selectedPokemon ?
      <PokemonPage /> :
      <PokedexContainer 
        onSelectPokemon={this.handleClickPokemon}
        pokemonOptions={pokemonOptions}
      />
    )
  }
}

const PokedexContainer = (props) => {
  const { pokemonOptions } = props
  console.log(pokemonOptions)
  return (
    <Column background='#e1e1ea'>
      <Header>Pokédex</Header>
      <StyledSelect 
        placeholder='Search for pokémons'
        options={pokemonOptions}
        labelKey='name'
        valueKey='url'
      />
    </Column>
  )
}
// Generally wouldn't be making API calls inside components, but since this is just a small app using vanilla React we can get away with it.
// There is a point to make about using a static data source for this, since it's the kind of data that's not prone to changes. Will only use APIs for demonstration purposes.
const fetchPokemonOptions = () => get('https://pokeapi.co/api/v2/pokemon').then(res => res.body.results).catch(err => console.log(err))
const fetchPokemon = (id) => get(`http://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.body).catch(err => console.log(err))
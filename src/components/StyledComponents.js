import styled from 'styled-components'
import Select from 'react-select'

export const Row = styled.div`

`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
  margin: ${props => props.margin || '0'};
  padding: ${props => props.padding || '0'};
  ${props => props.background && `background: ${props.background};`}
`

export const Header = styled.div`
  width: 100%;
  padding: 20px;
  background: #3d3d5c;
  font-size: 18px;
  color: #ffffff;
`

export const StyledSelect = styled(Select)`
  margin: 10px;
  width: 50%;
  z-index: 10;
`

export const PokemonCard = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  background: #a1a39e;
  color: #ffffff;
  cursor: pointer;
`
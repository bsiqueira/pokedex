import styled from 'styled-components'
import Select from 'react-select'
import { SpringGrid, makeResponsive } from 'react-stonecutter'

const Grid = makeResponsive(SpringGrid, { maxWidth: 1540 })

export const PokemonGrid = styled(Grid)`
  align-self: center;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  ${props => props.flex && `flex: ${props.flex};`}
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
  margin: ${props => props.margin || '0'};
  padding: ${props => props.padding || '0'};
  ${props => props.justifyContent && `justify-content: ${props.justifyContent};`}
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  ${props => props.flex && `flex: ${props.flex};`}
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
  margin: ${props => props.margin || '0'};
  padding: ${props => props.padding || '0'};
  ${props => props.background && `background: ${props.background};`}
  ${props => props.alignItems && `align-items: ${props.alignItems};`}
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
`

export const Span = styled.span`
  margin: ${props => props.margin || '0'};
  padding: ${props => props.padding || '0'};
  ${props => props.fontSize && `font-size: ${props.fontSize};`}  
  ${props => props.weight && `weight: ${props.weight};`}  
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
`

export const Header = styled.div`
  width: 100%;
  padding: 20px;
  background: #3d3d5c;
  font-size: 18px;
  color: #ffffff;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
`

export const StyledSelect = styled(Select)`
  margin: 30px 0;
  width: 50%;
  z-index: 10;
  align-self: center;
`

export const ReturnToPage = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin: 25px;
  &:hover {
    cursor: pointer;
  }
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;  
`

export const PokemonCard = styled(Column)`
  padding: 10px;
  background: #8F8E99;
  color: #ffffff;
  cursor: pointer;
  align-items: center;
  border-radius: 4px;
  min-height: 150px;
  min-width: 130px;
  border: 1px solid black;
  &:hover {
    background: #3D403C;
  }
`

export const PokemonDetailsContainer = styled(Column)`
  min-width: 500px;
  max-width: 50%;
  align-self: center;
  background: #8F8E99;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid black;
`

export const PokemonInfo = styled(Span)`
  color: #ffffff;
`

export const PokemonInfoLabel = styled(Span)`
  color: #3d3d5c;
  margin: 0 5px 0 0;
`

export const PokemonInfoHeader = styled(PokemonInfo)`
  font-size: 28px;
  margin: 0 0 15px 0;
`

export const PokemonInfoRow = styled(Row)`
  margin: 10px 0;
`

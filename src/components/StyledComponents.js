import styled from 'styled-components'
import Select from 'react-select'

export const Row = styled.div`

`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
  margin: ${props => props.margin || '0'}
  ${props => props.background && `background: ${props.background};`}
`

export const Header = styled.div`
  width: 100%;
  padding: 20px;
  font-size: 18px;
  border: 1 px solid black;
  background: #3d3d5c;
  color: #ffffff;
`

export const StyledSelect = styled(Select)`
  margin: 10px;
  width: 50%;
  z-index: 10;
`
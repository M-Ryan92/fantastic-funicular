import { styled } from 'styled-components';

export const TableContainer = styled.div<{height?: string}>`
display: flex;
overflow: hidden;
flex-flow: column nowrap;
background-color: ${(props) => props.theme.light_4};
height: ${(props) => props.height};
border-radius: 8px;
border: 1px solid ${(props) => props.theme.light_1};
box-shadow: 0px 1px 4px rgba(0, 0, 0, .08);
`

export const TableRow = styled.div`
display: flex;
flex-flow: row nowrap;
width: 100%;
border-bottom: 1px solid #dadada;
`

export const TableColumn = styled.div`
display: flex;
flex: 1;
font-size: 14px;
padding: 8px 0;
justify-content: center;
align-items: center;
transition: all 0.15s ease-in-out;
`

export const TableHeader = styled(TableRow)`
background-color: ${(props) => props.theme.light_1};
color: ${(props) => props.theme.black};
font-weight: bold;
`
export const CenterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: inherit;
`

export const TableRows = styled.div`
overflow: hidden;
overflow-y: auto;
overflow-x: auto;
`

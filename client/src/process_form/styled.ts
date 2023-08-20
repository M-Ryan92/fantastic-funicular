import { styled } from 'styled-components';
import { Box } from '../components';

export const StyledForm = styled(Box)`
display: flex;
overflow: hidden;
flex-flow: column nowrap;
background-color: ${(props) => props.theme.light_4};
border-radius: 8px;
border: 1px solid ${(props) => props.theme.light_1};
box-shadow: 0px 1px 4px rgba(0, 0, 0, .08);
`

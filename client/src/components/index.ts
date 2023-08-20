import { styled } from 'styled-components';
import { Theme } from '../theme';

export const Box = styled.div<{backGroundColor?: keyof Theme, padding?: string, direction?: string}>`
background-color: ${(props) => props.theme[props.backGroundColor ?? '']};
display: flex;
flex-direction: ${(props) => props.direction ?? 'column'};
padding: ${(props) => props.padding};
`


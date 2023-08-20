import { styled } from 'styled-components';

export const Header = styled.header`
  background-color: ${(props) => props.theme.primary };
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  height: 6rem;
`;

import React, { ReactElement } from 'react';
import { Header as StyledHeader } from './styled';

type HeaderProps = {
  title: string;
}

export const Header = ({title}: HeaderProps): ReactElement => (
  <StyledHeader >
    {title}
  </StyledHeader>
);

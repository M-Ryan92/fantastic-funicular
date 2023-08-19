import { ReactElement } from 'react';
import { Box, Grommet, Header, Text } from 'grommet';
import { ProcessForm } from './ProcessForm';
import { theme } from './theme';

type AppBarProps = {
  children?: ReactElement;
};
const AppBar = (props: AppBarProps): ReactElement => (
  <Header
    background="brand"
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation="medium"
    {...props}
  />
);

export const App = (): ReactElement => {
  return (
    <Grommet theme={theme} full background={'accent-3'}>
      <AppBar>
        <Text size="large">Customer Statement Processor</Text>
      </AppBar>

      <Box direction="row" flex overflow={{ horizontal: 'hidden' }}>
        <Box
          flex
          align="center"
          justify="center"
          margin={{ top: '5rem', bottom: '5rem' }}
        >
          <ProcessForm></ProcessForm>
        </Box>
      </Box>
    </Grommet>
  );
};

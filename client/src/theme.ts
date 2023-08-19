import { grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';

export const theme = deepMerge(grommet, {
  global: {
    colors: {
      brand: '#14449c',
      focus: '#23ccfa',
      'accent-1': '#a1b6d9',
      'accent-2': '#f2a46e',
      'accent-3': 'aliceblue',
    },
  },
});

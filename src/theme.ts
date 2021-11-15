import { extendTheme, ThemeConfig } from '@chakra-ui/react';

import { COLORS } from './utils/constants';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const colorConfig = {
  colors: {
    brand: {
      100: COLORS.PRIMARY,
      200: COLORS.SECONDARY,
      300: COLORS.ALTERNATIVE,
      400: COLORS.DANGER,
    },
  },
};

const theme = extendTheme({ ...config, ...colorConfig });

export default theme;

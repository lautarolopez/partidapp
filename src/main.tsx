// eslint-disable-next-line import/no-extraneous-dependencies
import Inspect from 'inspx';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import AuthProvider from './providers/AuthProvider';
import { store } from './reducers/MatchesReducer';
import App from './App';
import theme from './theme';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Inspect>
            <App />
          </Inspect>
        </ChakraProvider>
      </Provider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

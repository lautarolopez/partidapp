import React from 'react';

import { Container } from '@chakra-ui/react';

import Header from '../sections/Header';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }: Props) => (
  <>
    <Header />
    <Container
      display="flex"
      flexDirection="column"
      justifyContent="center"
      minW="100%"
      pt="10vh"
      alignItems="center"
      bgColor="brand.200"
      minH="100vh"
    >
      {children}
    </Container>
  </>
);

export default Layout;

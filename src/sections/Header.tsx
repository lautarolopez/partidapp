import React, { useContext } from 'react';
import { FaGoogle, FaSignOutAlt, FaStar } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

import { Button, Flex, Heading, Icon, Image, Link } from '@chakra-ui/react';

import logo from '../assets/logo.png';
import { auth, providers } from '../config/firebase';
import AuthContext from '../contexts/AuthContext';

const Header: React.FC = () => {
  const user = useContext(AuthContext);

  const handleLogIn = () => {
    auth.signInWithPopup(providers.google);
  };

  const handleLogOut = () => {
    auth.signOut();
  };

  return (
    <Flex
      as="nav"
      align="center"
      padding="3"
      position="fixed"
      w="100vw"
      h="10vh"
      justifyContent="space-between"
      bgColor="brand.100"
      color="white"
      zIndex="dropdown"
    >
      <Link as={RouterLink} to="/">
        <Flex alignItems="center">
          <Image
            src={logo}
            alt="Logo de la Liga Argentina de Fútbol"
            w="50px"
          />
          <Heading as="h1" size="lg" letterSpacing="tighter">
            Partidapp
          </Heading>
        </Flex>
      </Link>

      {user ? (
        <Flex alignItems="center">
          <Link
            as={RouterLink}
            to="/favorites"
            display="flex"
            alignItems="center"
          >
            Favorites <Icon as={FaStar} ml="2" />
          </Link>
          <Button
            onClick={handleLogOut}
            bgColor="brand.200"
            mx="25px"
            _hover={{ bg: '#604ac3' }}
          >
            Sign out <Icon as={FaSignOutAlt} ml="2" />
          </Button>
        </Flex>
      ) : (
        <Button
          onClick={handleLogIn}
          bgColor="brand.200"
          mx="25px"
          _hover={{ bg: '#604ac3' }}
        >
          Sign in with <Icon as={FaGoogle} ml="2" />
        </Button>
      )}
    </Flex>
  );
};

export default Header;

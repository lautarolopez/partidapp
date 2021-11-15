import { motion } from 'framer-motion';
import React from 'react';
import { BiFootball, BiRefresh } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Flex,
  Grid,
  GridItem,
  Icon,
  IconButton,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';

import MatchCard from '../components/MatchCard';
import Pagination from '../components/Pagination';
import useUser from '../hooks/useUser';
import { actionCreators } from '../reducers/MatchesReducer';
import FavoritesService from '../services/FavoritesService';
import MatchesService from '../services/MatchesService';
import { IFavorite, Match, MatchesState } from '../utils/types';

const MatchesList: React.FC = () => {
  const dispatch = useDispatch();
  const { matches, currentMatchday, favorites } = useSelector<
    MatchesState,
    MatchesState
  >((state) => state);

  const fetchMatches = async () => {
    dispatch(actionCreators.setMatches([]));
    const fetchedMatches = await MatchesService.getAllMatches();
    dispatch(actionCreators.setMatches(fetchedMatches));
  };

  const { user } = useUser();

  const handleFavClick = async (match: Match) => {
    if (user) {
      const favorite: IFavorite = {
        matchday: Number(match.round.name),
        index: matches[currentMatchday].indexOf(match),
      };
      await FavoritesService.saveFavorite(
        favorite.matchday,
        favorite.index,
        user.uid
      );
      dispatch(actionCreators.addNewFavorite(favorite));
    }
  };

  const handleUnfavClick = async (match: Match) => {
    if (user) {
      const favorite: IFavorite = {
        matchday: Number(match.round.name),
        index: matches[currentMatchday].indexOf(match),
      };
      await FavoritesService.removeFavorite(
        favorite.matchday,
        favorite.index,
        user.uid
      );
      dispatch(actionCreators.removeFavorite(favorite));
    }
  };

  const MotionBox = motion(Box);

  return Object.keys(matches).length === 0 ? (
    <Flex
      alignItems="center"
      justifyContent="center"
      direction="column"
      maxWidth="fit-content"
    >
      <MotionBox
        animate={{
          rotate: 360,
        }}
        transition={{ ease: 'linear', repeat: Infinity, duration: 3 }}
      >
        <Icon as={BiFootball} color="white" boxSize="200px" />
      </MotionBox>
      <Text color="white" maxWidth="fit-content" fontSize="1.5rem">
        Loading matches...
      </Text>
    </Flex>
  ) : (
    <Flex
      w="100%"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid
        templateColumns="repeat(3, 1fr)"
        minW="30vw"
        alignItems="center"
        mt="2"
      >
        <GridItem
          colStart={1}
          colEnd={1}
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
        >
          <IconButton
            aria-label="Load matches again"
            p="0"
            color="white"
            bgColor="brand.300"
            _hover={{ bg: '#745cd3' }}
            onClick={fetchMatches}
            icon={<Icon as={BiRefresh} boxSize="30px" />}
          />
        </GridItem>
        <GridItem
          colStart={2}
          colEnd={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Pagination />
        </GridItem>
      </Grid>
      <List>
        {matches[currentMatchday].map((match: Match) => (
          <ListItem key={match.match_id}>
            <MatchCard
              match={match}
              handleFav={() => handleFavClick(match)}
              handleUnfav={() => handleUnfavClick(match)}
              showFav={user !== null}
              link={`/${currentMatchday}/${matches[currentMatchday].indexOf(
                match
              )}`}
              isFav={
                favorites.find(
                  (fav: IFavorite) =>
                    fav.matchday === currentMatchday &&
                    fav.index === matches[currentMatchday].indexOf(match)
                ) !== undefined
              }
            />
          </ListItem>
        ))}
      </List>
    </Flex>
  );
};

export default MatchesList;

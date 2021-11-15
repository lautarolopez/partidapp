import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Flex, Icon, Text } from '@chakra-ui/react';

import { actionCreators } from '../reducers/MatchesReducer';
import { MatchesState } from '../utils/types';

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const { currentMatchday, matchDays } = useSelector<
    MatchesState,
    MatchesState
  >((state) => state);

  const handleSelect = (newMatchDay: number) => {
    dispatch(actionCreators.setCurrentMatchDay(newMatchDay));
  };

  return (
    <Flex alignItems="center" justifyContent="center">
      {matchDays.includes(currentMatchday - 1) && (
        <Icon
          aria-label="Next matchday"
          color="white"
          as={ArrowBackIcon}
          ml="2"
          _hover={{ cursor: 'pointer' }}
          onClick={() => {
            handleSelect(currentMatchday - 1);
          }}
        />
      )}
      <Text color="white" fontSize="1.3rem" mx="10px">
        Fecha {currentMatchday}
      </Text>
      {matchDays.includes(currentMatchday + 1) && (
        <Icon
          aria-label="Next matchday"
          color="white"
          as={ArrowForwardIcon}
          mr="2"
          _hover={{ cursor: 'pointer' }}
          onClick={() => {
            handleSelect(currentMatchday + 1);
          }}
        />
      )}
    </Flex>
  );
};

export default Pagination;

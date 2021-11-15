import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { StarIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Image, Link, Text } from '@chakra-ui/react';

import { COLORS, MATCH_STATUS } from '../utils/constants';
import { Match } from '../utils/types';

interface IMatchCardProps {
  match: Match;
  handleFav: () => void;
  handleUnfav: () => void;
  showFav: boolean;
  isFav: boolean;
  link: string;
}

const MatchCard: React.FC<IMatchCardProps> = ({
  match,
  handleFav,
  handleUnfav,
  showFav,
  isFav,
  link,
}: IMatchCardProps) => {
  const [favDisabled, setFavDisabled] = useState<boolean>(false);

  const handleClick = () => {
    setFavDisabled(true);
    if (isFav) handleUnfav();
    else handleFav();
    setTimeout(() => {
      setFavDisabled(false);
    }, 500);
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      m="5"
      bgColor="white"
      p="5"
      borderRadius="15px"
      minW="30vw"
      position="relative"
    >
      <Link
        as={RouterLink}
        to={link}
        p="2"
        display="flex"
        borderRadius="15px"
        _hover={{
          boxShadow: `inset 0px 0px 0px 1px ${COLORS.PRIMARY}`,
        }}
      >
        <Flex alignItems="center" justifyContent="center">
          <Flex alignItems="center" justifyContent="center" direction="column">
            <Image
              src={match.home_team.logo}
              alt={match.home_team.name}
              boxSize="50px"
            />
            <Text
              w="150px"
              h="50px"
              textAlign="center"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {match.home_team.name}
            </Text>
          </Flex>
        </Flex>
        <Flex alignItems="center" justifyContent="center" direction="column">
          <Text
            border="solid 2px"
            borderColor="brand.300"
            borderRadius="15px"
            color="Background.300"
            px="3"
          >
            {MATCH_STATUS[match.status_code]}
          </Text>
          <Text
            fontSize="2rem"
            fontWeight="bold"
            color="brand.100"
            px="2"
            mx="3"
          >
            {`${match.stats.home_score} - ${match.stats.away_score}`}
          </Text>
          <Text>{new Date(match.match_start).toLocaleDateString()}</Text>
        </Flex>
        <Flex alignItems="center" justifyContent="center">
          <Flex alignItems="center" justifyContent="center" direction="column">
            <Image
              src={match.away_team.logo}
              alt={match.away_team.name}
              boxSize="50px"
            />
            <Text
              w="150px"
              h="50px"
              textAlign="center"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {match.away_team.name}
            </Text>
          </Flex>
        </Flex>
      </Link>
      {showFav && (
        <IconButton
          position="absolute"
          borderRadius="0 15px 0"
          top="0"
          right="0"
          boxSize="40px"
          aria-label="Set favorite"
          icon={<StarIcon />}
          onClick={handleClick}
          color={isFav ? 'white' : 'brand.100'}
          bgColor={isFav ? 'brand.100' : 'gray.100'}
          disabled={favDisabled}
          _hover={
            isFav
              ? {
                  backgroundColor: COLORS.PRIMARY,
                  color: 'white',
                }
              : {
                  color: COLORS.PRIMARY,
                }
          }
        />
      )}
    </Flex>
  );
};

export default MatchCard;

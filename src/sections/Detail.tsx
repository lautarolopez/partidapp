import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { StarIcon } from '@chakra-ui/icons';
import {
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';

import Layout from '../components/Layout';
import NewComment from '../components/NewComment';
import AuthContext from '../contexts/AuthContext';
import { actionCreators } from '../reducers/MatchesReducer';
import CommentsService from '../services/CommentsService';
import FavoritesService from '../services/FavoritesService';
import { COLORS, MATCH_STATUS, MESSI_ILLUSTRATION } from '../utils/constants';
import {
  Comment,
  IFavorite,
  Match,
  MatchesState,
  RouteParams,
} from '../utils/types';

const Detail: React.FC = () => {
  const dispatch = useDispatch();
  const [favDisabled, setFavDisabled] = useState<boolean>(false);
  const [comments, setComments] = useState<Array<Comment>>([]);
  const { matchday, index } = useParams<RouteParams>();
  const { matches, currentMatchday, favorites } = useSelector<
    MatchesState,
    MatchesState
  >((state: MatchesState) => state);
  const user = useContext(AuthContext);
  const match: Match = matches[+matchday][+index];
  const isFav =
    favorites.find(
      (fav: IFavorite) =>
        fav.matchday === currentMatchday &&
        fav.index === matches[currentMatchday].indexOf(match)
    ) !== undefined;

  const handleComment = async (nickname: string, comment: string) => {
    const newComment: Comment = {
      nickname,
      comment,
      userId: user ? user.uid : '',
      matchday: +matchday,
      index: +index,
      image: user?.photoURL ? user.photoURL : '',
    };
    await CommentsService.saveComment(newComment);
    setComments([...comments, newComment]);
  };

  const handleFav = async () => {
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

  const handleUnfav = async () => {
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

  const handleClick = () => {
    setFavDisabled(true);
    if (isFav) handleUnfav();
    else handleFav();
    setTimeout(() => {
      setFavDisabled(false);
    }, 500);
  };

  const fetchComments = async () => {
    const fetchedDocs = await CommentsService.getMatchComments(
      +matchday,
      +index
    );
    const fetchedComments = fetchedDocs.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Comment)
    );
    setComments([...fetchedComments]);
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <Flex
        alignItems="center"
        justifyContent="flex-start"
        direction="column"
        m="5"
        bgColor="white"
        p="5"
        borderRadius="15px"
        position="relative"
        minW="40vw"
        minH="80vh"
      >
        <Flex justifyContent="space-around">
          <Flex alignItems="center" justifyContent="center">
            <Flex
              alignItems="center"
              justifyContent="center"
              direction="column"
              mr="5vh"
            >
              <Image
                src={match.home_team.logo}
                alt={match.home_team.name}
                boxSize="200px"
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
          <Flex alignItems="center" justifyContent="center">
            <Flex
              alignItems="center"
              justifyContent="center"
              direction="column"
              ml="5vw"
            >
              <Image
                src={match.away_team.logo}
                alt={match.away_team.name}
                boxSize="200px"
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
        </Flex>
        <Flex alignItems="center" justifyContent="center" direction="column">
          <Text
            border="solid 2px"
            borderColor="brand.300"
            borderRadius="15px"
            color="Background.300"
            px="3"
          >
            Matchday {match.round.name}
          </Text>
          <Text
            fontSize="5rem"
            fontWeight="bold"
            color="brand.100"
            px="2"
            mx="3"
          >
            {`${match.stats.home_score} - ${match.stats.away_score}`}
          </Text>
          <Text fontSize="2rem">{MATCH_STATUS[match.status_code]}</Text>
          <Text fontSize="2rem">
            {new Date(match.match_start).toDateString()}
          </Text>
          <Text fontSize="2rem">{match.venue.name}</Text>
          <Text fontSize="2rem">{match.venue.city}</Text>
        </Flex>
        {user && (
          <Flex direction="column" width="80%" mt="5">
            <Heading as="h6" fontSize="1rem" alignSelf="flex-start">
              Leave a comment
            </Heading>
            <NewComment handleComment={handleComment} />
          </Flex>
        )}
        {comments.length !== 0 && (
          <List width="80%" mt="5">
            {comments.map((comment: Comment) => (
              <>
                <ListItem key={comment.id} m="5" display="flex">
                  {comment.image.length !== 0 && (
                    <Image
                      src={
                        comment.image !== ''
                          ? comment.image
                          : MESSI_ILLUSTRATION
                      }
                      alt={`${comment.nickname} profile picture`}
                      boxSize="40px"
                      borderRadius="50%"
                      mr="5"
                    />
                  )}
                  <Flex direction="column">
                    <Text fontWeight="bold">{comment.nickname}</Text>
                    <Text>{comment.comment}</Text>
                  </Flex>
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        )}
        {user && (
          <IconButton
            disabled={favDisabled}
            position="absolute"
            borderRadius="0 15px 0"
            top="0"
            right="0"
            boxSize="50px"
            aria-label="Set favorite"
            icon={<StarIcon />}
            onClick={handleClick}
            color={isFav ? 'white' : 'brand.100'}
            bgColor={isFav ? 'brand.100' : 'gray.100'}
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
    </Layout>
  );
};

export default Detail;

import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { List, ListItem } from '@chakra-ui/react';

import Layout from '../components/Layout';
import MatchCard from '../components/MatchCard';
import AuthContext from '../contexts/AuthContext';
import { actionCreators } from '../reducers/MatchesReducer';
import FavoritesService from '../services/FavoritesService';
import { IFavorite, MatchesState } from '../utils/types';

const Favorites: React.FC = () => {
  const dispatch = useDispatch();
  const user = useContext(AuthContext);
  const { favorites, matches } = useSelector<MatchesState, MatchesState>(
    (state: MatchesState) => state
  );

  const handleFavClick = async (favorite: IFavorite) => {
    if (user) {
      await FavoritesService.saveFavorite(
        favorite.matchday,
        favorite.index,
        user.uid
      );
      dispatch(actionCreators.addNewFavorite(favorite));
    }
  };

  const handleUnfavClick = async (favorite: IFavorite) => {
    if (user) {
      await FavoritesService.removeFavorite(
        favorite.matchday,
        favorite.index,
        user.uid
      );
      dispatch(actionCreators.removeFavorite(favorite));
    }
  };

  if (!user) return <Redirect to="/" />;
  return (
    <Layout>
      <List>
        {favorites.map((fav: IFavorite) => (
          <ListItem key={matches[fav.matchday][fav.index].match_id}>
            <MatchCard
              match={matches[fav.matchday][fav.index]}
              handleFav={() => handleFavClick(fav)}
              handleUnfav={() => handleUnfavClick(fav)}
              showFav={user !== null}
              link={`/${fav.matchday}/${fav.index}`}
              isFav
            />
          </ListItem>
        ))}
      </List>
    </Layout>
  );
};

export default Favorites;

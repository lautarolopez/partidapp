import { createStore, Reducer } from 'redux';

import { auth } from '../config/firebase';
import FavoritesService from '../services/FavoritesService';
import MatchesService from '../services/MatchesService';
import { IFavorite, Match, MatchesState } from '../utils/types';

import { getRounds, sortMatches } from './utils';

export const INITIAL_STATE: MatchesState = {
  currentMatchday: 1,
  matchDays: [],
  matches: {},
  favorites: [],
};

interface SetMatches {
  type: 'SET_MATCHES';
  payload: {
    matches: Array<Match>;
  };
}

interface SetCurrentMatchDay {
  type: 'SET_CURRENT_MATCH_DAY';
  payload: {
    matchDay: number;
  };
}

interface AddNewFavorite {
  type: 'ADD_NEW_FAVORITE';
  payload: {
    favorite: IFavorite;
  };
}

interface RemoveFavorite {
  type: 'REMOVE_FAVORITE';
  payload: {
    favorite: IFavorite;
  };
}

export type Action =
  | SetMatches
  | SetCurrentMatchDay
  | AddNewFavorite
  | RemoveFavorite;

export const actionCreators = {
  setMatches: (matches: Array<Match>): SetMatches => ({
    type: 'SET_MATCHES',
    payload: {
      matches,
    },
  }),
  setCurrentMatchDay: (matchDay: number): SetCurrentMatchDay => ({
    type: 'SET_CURRENT_MATCH_DAY',
    payload: {
      matchDay,
    },
  }),
  addNewFavorite: (favorite: IFavorite): AddNewFavorite => ({
    type: 'ADD_NEW_FAVORITE',
    payload: {
      favorite,
    },
  }),
  removeFavorite: (favorite: IFavorite): RemoveFavorite => ({
    type: 'REMOVE_FAVORITE',
    payload: {
      favorite,
    },
  }),
};

export const reducer: Reducer<MatchesState, Action> = (
  state: MatchesState | undefined,
  action: Action
): MatchesState => {
  if (state) {
    switch (action.type) {
      case 'SET_MATCHES': {
        return {
          ...state,
          matches: sortMatches(action.payload.matches),
          matchDays: getRounds(action.payload.matches),
        };
      }
      case 'SET_CURRENT_MATCH_DAY': {
        return {
          ...state,
          currentMatchday: action.payload.matchDay,
        };
      }
      case 'ADD_NEW_FAVORITE': {
        return {
          ...state,
          favorites: [...state.favorites, action.payload.favorite],
        };
      }
      case 'REMOVE_FAVORITE': {
        return {
          ...state,
          favorites: [
            ...state.favorites.filter(
              (fav: IFavorite) =>
                JSON.stringify(fav) !== JSON.stringify(action.payload.favorite)
            ),
          ],
        };
      }
      default: {
        return state;
      }
    }
  }
  return INITIAL_STATE;
};

const savetoLocalStorage = (state: MatchesState) => {
  try {
    localStorage.setItem('matchesState', JSON.stringify(state));
  } catch (error) {
    console.error(error);
  }
};

const loadFromLocalStorage = async () => {
  try {
    const stateString = localStorage.getItem('matchesState');
    if (!stateString) {
      const fetchedMatches = await MatchesService.getAllMatches();
      let fetchedFavorites;
      if (auth.currentUser?.uid) {
        fetchedFavorites = await FavoritesService.getUserFavorites(
          auth.currentUser?.uid
        );
      }
      const finalFavs: Array<IFavorite> =
        fetchedFavorites && fetchedFavorites.exists
          ? (fetchedFavorites.data()?.favorites as Array<IFavorite>)
          : [];
      return {
        ...INITIAL_STATE,
        matches: sortMatches(fetchedMatches),
        matchDays: getRounds(fetchedMatches),
        favorites: finalFavs,
      };
    }
    return JSON.parse(stateString) as MatchesState;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const firstCreateStore = async () => {
  const store = createStore(reducer, await loadFromLocalStorage());
  store.subscribe(() => {
    savetoLocalStorage(store.getState());
  });
};

firstCreateStore();

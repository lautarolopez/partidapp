import firebase from 'firebase/compat/app';

import 'firebase/compat/firestore';

import { arrayRemove, arrayUnion, db } from '../config/firebase';
import { FAVORITES_COLLECTION } from '../utils/constants';

const FavoritesService = {
  // In this method we need to verify if the document exists,
  // because with an array the beheavieur of set method is
  // to override the favorites property, then we lose all
  // the previous favorites.
  saveFavorite: async (
    matchday: number,
    index: number,
    id: string
  ): Promise<void> => {
    const document = await db.collection(FAVORITES_COLLECTION).doc(id).get();
    if (document && document.exists) {
      return db
        .collection(FAVORITES_COLLECTION)
        .doc(id)
        .update({
          favorites: arrayUnion({
            matchday,
            index,
          }),
        });
    }
    return db
      .collection(FAVORITES_COLLECTION)
      .doc(id)
      .set({
        favorites: [
          {
            matchday,
            index,
          },
        ],
      });
  },
  getUserFavorites: (
    id: string
  ): Promise<
    firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
  > => db.collection(FAVORITES_COLLECTION).doc(id).get(),
  removeFavorite: (
    matchday: number,
    index: number,
    id: string
  ): Promise<void> =>
    db
      .collection(FAVORITES_COLLECTION)
      .doc(id)
      .update({
        favorites: arrayRemove({
          matchday,
          index,
        }),
      }),
};

export default FavoritesService;

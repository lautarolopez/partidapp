import firebase from 'firebase/compat/app';

import 'firebase/compat/firestore';

import { db } from '../config/firebase';
import { COMMENTS_COLLECTION } from '../utils/constants';
import { Comment } from '../utils/types';

const CommentsService = {
  saveComment: async (comment: Comment): Promise<void> =>
    db.collection(COMMENTS_COLLECTION).doc().set(comment),
  getMatchComments: (
    matchday: number,
    index: number
  ): Promise<
    firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  > => {
    const commentsRef = db.collection(COMMENTS_COLLECTION);
    const matchdayRef = commentsRef.where('matchday', '==', matchday);
    return matchdayRef.where('index', '==', index).get();
  },
};

export default CommentsService;

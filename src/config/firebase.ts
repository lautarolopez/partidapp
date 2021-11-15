import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import config from './config';

const Firebase = firebase.initializeApp(config.firebase);

export const providers = {
  google: new firebase.auth.GoogleAuthProvider(),
};

export const auth = firebase.auth();
export const db = firebase.firestore();
export const { arrayUnion, arrayRemove } = firebase.firestore.FieldValue;

export default Firebase;

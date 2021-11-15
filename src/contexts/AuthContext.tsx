import firebase from 'firebase/compat/app';
import React from 'react';

const AuthContext = React.createContext<firebase.User | null>(null);

export default AuthContext;

import firebase from 'firebase/compat/app';
import { useEffect, useState } from 'react';

import { auth } from '../config/firebase';
import AuthContext from '../contexts/AuthContext';

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children = null }: Props) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

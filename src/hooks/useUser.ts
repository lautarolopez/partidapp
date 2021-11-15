import firebase from 'firebase/compat/app';
import { useContext } from 'react';

import AuthContext from '../contexts/AuthContext';

interface IUseUser {
  user: firebase.User | null;
}

const useUser = (): IUseUser => {
  const user = useContext(AuthContext);
  return { user };
};

export default useUser;

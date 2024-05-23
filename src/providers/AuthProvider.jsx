import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../firebase/firebase.config'
import axios from "axios";


export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const createUser = (email, password) =>{
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const signin =(email, password) =>{
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser =>{
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };
      setUser(currentUser);
      console.log('set Current User', currentUser);
      setLoading(false);

      // if user exists then a token
      if (currentUser) {
        axios.post('http://localhost:5000/jwt', loggedUser, { withCredentials: true })
        .then(res => {
          console.log('token response', res.data);
        })
      }
      else{
        axios.post('http://localhost:5000/logout', loggedUser, {
          withCredentials: true
        })
        .then(res => {
          console.log(res.data);
        })
      }
    })
    return () =>{
      return unsubscribe();
    }
  }, [])

  const logOut = () =>{
    setLoading(true);
    return signOut(auth);
  }

  const authInfo = {user, loading, createUser, signin, logOut}

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
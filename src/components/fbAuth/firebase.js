import React, { useState, useEffect, createContext } from "react";
import { Spinner } from "react-bootstrap";
import firebase from "firebase/app";
import "firebase/auth";
/*
    The context is imported and used by individual components
    that need data
*/
export const FirebaseContext = createContext()

/*
 This component establishes what data can be used.
 */
export const FirebaseProvider = (props) => {
  const active_user = sessionStorage.getItem("active_user");
  const [isLoggedIn, setIsLoggedIn] = useState(active_user != null);

  const [isFirebaseReady, setIsFirebaseReady] = useState(false);

  const provider = new firebase.auth.GoogleAuthProvider();
//https://firebase.google.com/docs/auth/web/start?authuser=0
  useEffect(() => {
    firebase.auth().onAuthStateChanged((u) => {
      setIsFirebaseReady(true);
    });
  }, []);

  //setup other firebase logins


  const login = (email, pw) => {
    return firebase.auth().signInWithEmailAndPassword(email, pw)

      .then((active_user) => {
        sessionStorage.setItem("active_user", JSON.stringify(active_user.user));
        setIsLoggedIn(true);
      });
  };

  const logout = () => {
    return firebase.auth().signOut()
      .then(() => {
        sessionStorage.clear()
        setIsLoggedIn(false);
      });
  };

  const register = (active_user, password) => {
    return firebase.auth().createUserWithEmailAndPassword(active_user.email, password)
      .then(savedactive_user => {
        console.log('savedU', savedactive_user)
        sessionStorage.setItem("active_user", JSON.stringify(savedactive_user.user))
        setIsLoggedIn(true);
      });
  };
  

  const signInWithGoogle = () => {
    return firebase.auth().signInWithPopup(provider)
      .then(savedactive_user => {
        console.log('savedU', savedactive_user)
        sessionStorage.setItem("active_user", JSON.stringify(savedactive_user.user))
        setIsLoggedIn(true);
      })
  }


  /*
    You return a context provider
    allow any child elements to access them.
*/

  return (
    <FirebaseContext.Provider value={{ isLoggedIn, login, logout, register, signInWithGoogle }}>
      {isFirebaseReady
        ? props.children
        : <Spinner className="app-spinner dark" />}
    </FirebaseContext.Provider>
  );
}

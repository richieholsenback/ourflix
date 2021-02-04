import React, { useState, useEffect, createContext } from "react";
import { Spinner } from "react-bootstrap";
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "../fbAuth/FirebaseConfig";
import { addUser } from "../../modules/APICalls";

const dataURL = firebaseConfig.databaseURL;
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
    .then(savedactive_user => {
      console.log('savedU', savedactive_user)
      return (savedactive_user.user.uid)
    }).then(uid => {
      checkUser(uid)
    }
    )
}

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
        return (savedactive_user.user.uid)
      }).then(uid => {
        checkUser(uid)
      }
      )
  }
  const signInWithGoogle = () => {
    return firebase.auth().signInWithPopup(provider)
    //sign in
      .then(savedactive_user => {
        //take the user that was signed in
        console.log('savedU', savedactive_user)
        return (savedactive_user.user.uid)
        //Grab their uid
      }).then(uid => {
        //then run it through our user check
        checkUser(uid)
      }

      )
  }

  const checkUser = (userId) => {
    console.log("checkUser", userId)
    fetch(`${firebaseConfig.databaseURL}/users.json/?orderBy="uid"&equalTo="${firebase.auth().currentUser.uid}"`)
      // go to the db and pull any user with the uid of the signed in user
      .then(result => result.json())
      //convert to JSON
      .then(parsedResult => {
        console.log("check result", parsedResult)
        let resultArray = Object.keys(parsedResult)
        //Convert the logged in user object into an array - children cannot be objects
        if (resultArray.length > 0) {
          //if the array in the db has info, has more info than 0, just log them in
          console.log("YEAH, true user")
          sessionStorage.setItem("active_user", JSON.stringify(firebase.auth().currentUser))
          setIsLoggedIn(true);
        } else {
          //if not, create a user in the db and then log them in
          addUser(firebase.auth().currentUser)
            .then(() => {
              sessionStorage.setItem("active_user", JSON.stringify(firebase.auth().currentUser))
              setIsLoggedIn(true)
            })
          //add to user in DB
        }
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

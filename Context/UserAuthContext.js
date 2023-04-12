import { useContext } from "react";
import { createContext } from "react";
import baseUrl from "directsecondyearadmission/baseUrl";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithPopup,
  updateProfile,
  sendEmailVerification,
  //roles
  getIdTokenResult,
} from "firebase/auth";

import { auth } from "directsecondyearadmission/firebase";
import { useEffect } from "react";
import { useState } from "react";

const userAuthContext = createContext();
export function UserAuthContexProvider({ children }) {
  const [user, setuser] = useState("");

  async function checkRole(token, uid) {
    // await authAdmin.setCustomUserClaims(uid).then(() => {
    //   console.log("You are admin");
    // });

    // to check role
    auth.currentUser
      .getIdTokenResult()
      .then((idTokenResult) => {
        // if (!!idTokenResult.claims.admin) {
        //   console.log("Show admin UI.");
        // } else {
        //   console.log("Show regular user UI.");
        // }

        console.log(idTokenResult);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function signUp(emailUser, password, name) {
    const res = await createUserWithEmailAndPassword(auth, emailUser, password);
    const { displayName, email, photoURL, reloadUserInfo, uid } = res.user;

    await fetch("/api/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userPhoto: photoURL,
        fName: displayName,
        email: email,
        password: reloadUserInfo.passwordHash,
        firebaseID: uid,
      }),
    });
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: "https://example.com/jane-q-user/profile2.jpg",
    });
    console.log(displayName);
    await sendEmailVerification(res.user);
    // console.log(res.user);
    return res;
  }

  async function updateUserProfile() {
    const res = await updateProfile(auth.currentUser, {
      displayName: "Gaurav NAenaware",
      phoneNumber: "+11234567890",
      photoURL: "https://example.com/jane-q-user/profile2.jpg",
    })
      .then(() => {
        console.log("Profile updated!");
        // ...
      })
      .catch((error) => {
        console.log(error);
        // ...
      });

    console.log(auth.currentUser);
    return res;
  }

  function signUIn(email, password) {
    const res = signInWithEmailAndPassword(auth, email, password);
    return res;
  }
  function logOut() {
    return signOut(auth);
  }
  async function signWithGoogle() {
    const googleAuthProvider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, googleAuthProvider);
    const { displayName, email, photoURL, reloadUserInfo, uid } = res.user;
    await fetch("/api/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userPhoto: photoURL,
        fName: displayName,
        email: email,
        password: reloadUserInfo.passwordHash,
        firebaseID: uid,
      }),
    });
    return res;
  }

  function resetPassword(email) {
    const actionCodeSettings = {
      url: baseUrl + "?email=" + email,

      handleCodeInApp: true,
    };
    return sendPasswordResetEmail(auth, email, actionCodeSettings);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setuser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        user,
        signUp,
        signUIn,
        logOut,
        updateUserProfile,
        checkRole,
        signWithGoogle,
        resetPassword,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}

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
  updatePhoneNumber,
  RecaptchaVerifier,
  PhoneAuthProvider,
} from "firebase/auth";

import { auth } from "directsecondyearadmission/firebase";
import { useEffect } from "react";
import { useState } from "react";
import { useAdminContext } from "./AdminContext";

const userAuthContext = createContext();
export function UserAuthContexProvider({ children }) {
  const [user, setuser] = useState("");
  const [token, settoken] = useState("");
  const [verificatioIDPhone, setverificatioIDPhone] = useState("");

  const [toastMsg, settoastMsg] = useState({
    state: "hidden",
    icon: "success",
    msg: "Already Exist",
  });
  const closeModal = () => {
    settoastMsg({
      state: "hidden",
      icon: "",
      msg: "",
    });
  };

  const openModal = (icon, msg) => {
    settoastMsg({
      state: "block",
      icon: icon,
      msg: msg,
    });
  };

  useEffect(() => {
    const getToken = () => {
      settoken(localStorage.getItem("token"));
    };
    getToken();
  }, []);

  const sendOTP = async (phoneNo) => {
    try {
      const applicationVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {},
        auth
      );
      await applicationVerifier.render();
      const provider = new PhoneAuthProvider(auth);
      const verificationId = await provider.verifyPhoneNumber(
        "+" + phoneNo,
        applicationVerifier
      );
      setverificatioIDPhone(verificationId);
      return { msg: "Send OTP to " + phoneNo };
    } catch (error) {
      return { error: error.code.slice(5, error.code.length) };
    }
  };

  const verifyOTPServer = async (otp) => {
    try {
      const phoneCredential = PhoneAuthProvider.credential(
        verificatioIDPhone,
        otp
      );
      const res = await updatePhoneNumber(user, phoneCredential);
      console.log(res);
      return { msg: "Phone Nmber Updated" };
    } catch (error) {
      return { error: error.code.slice(5, error.code.length) };
    }
  };

  async function signUp(emailUser, password, name, gender) {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        emailUser,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL:
          gender === "Male" ? "/img/maleUser.svg" : "/img/femaleUser.svg",
      });
      const { displayName, email, photoURL, reloadUserInfo, uid } =
        auth.currentUser;
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

      await sendEmailVerification(res.user);
      return { msg: "Account Created" };
    } catch (error) {
      console.log(error);
      return { error: error.code.slice(5, error.code.length) };
    }
  }

  async function updateUserProfile() {
    const res = await updateProfile(auth.currentUser, {
      displayName: "Gaurav NAenaware",
      photoURL: "https://example.com/jane-q-user/profile2.jpg",
    })
      .then(() => {
        console.log("Profile updated!");
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(auth.currentUser);
    return res;
  }

  async function signIn(email, password) {
    const res = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("token", await res.user.getIdToken());
    localStorage.setItem("firebaseuid", res.user.uid);
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
    localStorage.setItem("token", await res.user.getIdToken());
    localStorage.setItem("firebaseuid", res.user.uid);

    // console.log(res.user.getIdToken());
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
        signIn,
        logOut,
        token,
        updateUserProfile,
        signWithGoogle,
        sendOTP,
        verifyOTPServer,
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

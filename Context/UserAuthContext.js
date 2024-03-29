import { useContext } from "react";
import { createContext } from "react";
import baseUrl from "directsecondyearadmission/baseUrl";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  updateEmail,
} from "firebase/auth";

import { auth } from "directsecondyearadmission/firebase";
import { useEffect } from "react";
import { useState } from "react";

const userAuthContext = createContext();
export function UserAuthContexProvider({ children }) {
  const [user, setuser] = useState("");
  const [token, settoken] = useState("");
  const [response, setresponse] = useState("");
  const [Uid, setUid] = useState("");
  const [verificatioIDPhone, setverificatioIDPhone] = useState("");

  useEffect(() => {
    const getToken = () => {
      settoken(localStorage.getItem("token"));
      setUid(localStorage.getItem("firebaseuid"));
    };
    getToken();
  }, [response]);

  const newEmailUpdate = async (newEmail) => {
    try {
      const res = await updateEmail(user, newEmail);

      return { msg: "Email has been changes" };
    } catch (error) {
      return { error: error.code.slice(5, error.code.length) };
    }
  };

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
      setresponse(Math.random());
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
      setresponse(Math.random());
      return { msg: "Phone Nmber Updated" };
    } catch (error) {
      return { error: error.code.slice(5, error.code.length) };
    }
  };

  const verifyEmail = async (email, user) => {
    try {
      const actionCodeSettings = {
        url: baseUrl + "?email=" + email,
      };
      await sendEmailVerification(user, actionCodeSettings);
      return { msg: "Check your mail to Verify" };
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
      await verifyEmail(emailUser, res.user);

      toast.success("Check your Email to Verify", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      localStorage.setItem("token", await res.user.getIdToken());
      localStorage.setItem("firebaseuid", res.user.uid);
      setresponse(Math.random());
      return { msg: "Account Created" };
    } catch (error) {
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

    return res;
  }

  async function signIn(email, password) {
    const res = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("token", await res.user.getIdToken());
    localStorage.setItem("firebaseuid", res.user.uid);
    setresponse(Math.random());

    return res;
  }
  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("firebaseuid");
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
    setresponse(Math.random());
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
        verifyEmail,
        sendOTP,
        verifyOTPServer,
        Uid,
        resetPassword,
        setresponse,

        newEmailUpdate,
      }}
    >
      <ToastContainer />
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}

import React, { useEffect, useState } from "react";
import { Analytics, getAnalytics } from "firebase/analytics";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { Auth, getAuth } from "firebase/auth";
import AppContext from "./AppContext";
import { firebaseConfig } from "../Tools/firebase-app";

function AppProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setReady] = useState(false);
  const ready = () => setReady(true)
  const [loading, setLoading] = useState(false);

  const initLoad = () => setLoading(true)
  const finishLoad = () => setLoading(false)

  const [title, setTitle] = useState("App")

  const firebase: FirebaseApp = initializeApp(firebaseConfig)
  const analytics: Analytics = getAnalytics(firebase)
  const firestore: Firestore = getFirestore(firebase)
  const auth: Auth = getAuth(firebase)

  // useEffect(() => {
  //   if (Notification.permission == "default")
  //     Notification.requestPermission().then(function (permission) {
  //       console.log(permission);
  //     });
  // }, [])

  const value = {
    firebase,
    analytics,
    auth,
    firestore,
    isReady,
    ready,
    loading,
    initLoad,
    finishLoad,
    title,
    setTitle
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppProvider;
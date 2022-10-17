import { Analytics } from "firebase/analytics";
import { FirebaseApp } from "firebase/app";
import { Auth } from "firebase/auth";
import { Firestore, Unsubscribe } from "firebase/firestore";
import React from "react";
import Person from "../Models/Profile";

export interface AppContextType {
  firebase: FirebaseApp,
  analytics: Analytics,
  auth: Auth,
  firestore: Firestore,
  isReady: boolean,
  ready: () => void,
  loading: boolean,
  initLoad: () => void,
  finishLoad: () => void,
  title: string,
  setTitle: Function
}

let AppContext = React.createContext<AppContextType>(null!);

export default AppContext
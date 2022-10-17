import { User, UserCredential } from "firebase/auth";
import React from "react";
import Profile from "../Models/Profile";

export interface AuthContextType {
  user?: User,
  profile?: Profile,
  login: (email: string, password: string) => Promise<UserCredential>,
  signin: (name: string, lastname: string, email: string, password: string) => Promise<void>,
  signout: () => Promise<void>,
  signInGoogle: () => Promise<User>
}

let AuthContext = React.createContext<AuthContextType>(null!);

export default AuthContext
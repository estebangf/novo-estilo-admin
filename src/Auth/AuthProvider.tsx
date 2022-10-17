import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, User } from "firebase/auth";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import Profile, { PROFILES_COLLECTION, profileConverter, initialProfile } from "../Models/Profile";
import { useApp } from "../Tools/Hooks";
import AuthContext from "./AuthContext";


function AuthProvider({ children }: { children: React.ReactNode }) {
  const app = useApp()

  const [user, setUser] = useState<User>();
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    app.auth.onAuthStateChanged(userObserver => {
      if (userObserver) {
        let refUserDoc = doc(app.firestore, "profiles", userObserver.uid)
        const unsubscribe = onSnapshot(refUserDoc.withConverter(profileConverter), userDocSnapshot => {
          if (userDocSnapshot.exists())
            setUser(userObserver)
          setProfile(userDocSnapshot.data())
          app.ready()
        })
      } else {
        setUser(undefined)
        setProfile(undefined)
        app.ready()
      }
    })
  }, []);


  useEffect(() => {
    if (user)
      onSnapshot(doc(app.firestore, PROFILES_COLLECTION, user?.uid).withConverter(profileConverter), (doc) => {
        setProfile(doc.data())
      });
    else setUser(undefined)
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      login: (email: string, password: string) => signInWithEmailAndPassword(app.auth, email, password),
      signin: (name: string, lastname: string, email: string, password: string) =>
        createUserWithEmailAndPassword(app.auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            let profile: Profile = {
              ...initialProfile,
              displayName: `${name} ${lastname}`,
              email
            }
            setDoc(doc(app.firestore, PROFILES_COLLECTION, user.uid).withConverter(profileConverter), profile).then(() => {

            }).catch(error => {
              alert("ERROR: REGISTRO DE PROFILEA")
              console.error("REGISTRO DE PROFILEA => ", error)
            })
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log("Registred ERROR => ", errorMessage);
          }),
      signout: () => signOut(app.auth),
      signInGoogle: () => new Promise<User>((resolve, reject) => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(app.auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            if (credential) {
              const token = credential.accessToken;
              // The signed-in user info.
              const user = result.user;
              const userRefDoc = doc(app.firestore, PROFILES_COLLECTION, user.uid);
              getDoc(userRefDoc).then(userDocSnapshot => {
                if (!userDocSnapshot.exists()) {
                  let profile: Profile = {
                    createdAt: new Date(),
                    displayName: user.displayName!,
                    email: user.email!,
                    emailVerified: user.emailVerified,
                    phoneNumber: user.phoneNumber!,
                    photoURL: user.photoURL!,

                    roles: ["user"]
                  }
                  setDoc(doc(app.firestore, PROFILES_COLLECTION, user.uid).withConverter(profileConverter), profile).then(() => {
                    resolve(user)
                  }).catch(error => {
                    alert("ERROR: REGISTRO DE PROFILEA")
                    console.error("REGISTRO DE PROFILEA => ", error)
                    reject(error.message)
                  })
                } else {
                  resolve(user)
                }
              }).catch(error => {
                console.error("Error col users => ", error)
                const code = "ERROR";
                const message = "Error";
                reject({ code, message })
              })
            } else {
              const code = "ERROR";
              const message = "Error";
              reject({ code, message })
            }
          })
          .catch((error) => {
            // Handle Errors here.
            const code = error.code;
            const message = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            reject({ code, message, email, credential })
          });
      })
    }}
    >{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
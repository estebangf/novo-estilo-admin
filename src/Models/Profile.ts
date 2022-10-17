import { DocumentData } from "firebase/firestore"

import { Timestamp } from "firebase/firestore"
import Roles from "./Role"

export const PROFILES_COLLECTION = "profiles"

export default interface Profile {
  id?: string,
  createdAt: Date
  displayName: string,
  email: string,
  emailVerified?: boolean,
  phoneNumber: string,
  photoURL: string,

  roles: string[]

//   id?: string
//   createdAt: Timestamp
//   roles: Roles
//   name: string
//   lastname: string
//   phone: number
//   address: string
//   email: string
//   photo: string
}

// Firestore data converter
export const profileConverter = {
  toFirestore: (profile: Profile) => {
    return {
      createdAt: Timestamp.fromDate(profile.createdAt),
      roles: profile.roles,
      displayName: profile.displayName,
      phoneNumber: profile.phoneNumber,
      email: profile.email,
      photoURL: profile.photoURL,
    }
  },
  fromFirestore: (snapshot: DocumentData, options: any) => {
    const data = snapshot.data(options)
    let newProfile: Profile = {
      id: snapshot.id,
      createdAt: data.createdAt.toDate(),
      roles: data.roles,
      displayName: data.displayName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      photoURL: data.photoURL,
    }
    return newProfile;
  },
}



export const initialProfile: Profile = {
  createdAt: new Date(),
  roles: [],
  photoURL: "https://www.gstatic.com/images/branding/product/1x/contacts_48dp.png",
  displayName: "",
  email: "",
  phoneNumber: ""
}
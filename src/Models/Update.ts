import { DocumentData } from "firebase/firestore"

import { Timestamp } from "firebase/firestore"

const UPDATES_COLLECTION = "updates"


interface Update {
  id?: string
  createdAt: Date
  description: string
  seedForUsers: string[]
  images: string[]
}

// Firestore data converter
const updateConverter = {
  toFirestore: (update: Update) => {
    return {
      createdAt: Timestamp.fromDate(update.createdAt),
      seedForUsers: update.seedForUsers,
      images: update.images,
      description: update.description,
    }
  },
  fromFirestore: (snapshot: DocumentData, options: any) => {
    const data = snapshot.data(options)
    let newUpdate: Update = {
      id: snapshot.id,
      createdAt: data.createdAt.toDate(),
      seedForUsers: data.seedForUsers,
      images: data.images,
      description: data.description,
    }
    return newUpdate;
  },
}

export {
  UPDATES_COLLECTION,
  updateConverter,
}
export default Update;
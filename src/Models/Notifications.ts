import { DocumentData, Timestamp } from "firebase/firestore";

const NOTIFICATIONS_COLLECTION = "notifications"

interface NotificationModel {
  id?: string,
  title: string,
  description: string,
  date: Date,
  url: string,
  createdBy: string,
  seedForUsers: string[]
}

const NotificationInitial: NotificationModel = {
  title: "",
  description: "",
  date: new Date(),
  url: "",
  createdBy: "",
  seedForUsers: []
}




// Firestore data converter
const notificationConverter = {
  toFirestore: (notification: NotificationModel) => {
    return {
      title: notification.title,
      description: notification.description,
      date: Timestamp.fromDate(notification.date),
      url: notification.url,
      createdBy: notification.createdBy,
      seedForUsers: notification.seedForUsers,
    }
  },
  fromFirestore: (snapshot: DocumentData, options: any) => {
    const data = snapshot.data(options)
    let newNotification: NotificationModel = {
      id: snapshot.id,
      title: data.title,
      description: data.description,
      date: data.date.toDate(),
      url: data.url,
      createdBy: data.createdBy,
      seedForUsers: data.seedForUsers,
    }
    return newNotification;
  },
}



export {
  NOTIFICATIONS_COLLECTION,
  NotificationInitial,
  notificationConverter,
}
export type NotificationType = "entry" | "egress";
export default NotificationModel;
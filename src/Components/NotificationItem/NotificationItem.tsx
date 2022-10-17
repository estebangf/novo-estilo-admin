import { MenuItem, Typography, IconButton, Button } from "@mui/material";
import React from "react";
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import NotificationModel, { NOTIFICATIONS_COLLECTION } from "../../Models/Notifications";

import LinkStyled from "../LinkStyled";

import "./NotificationItem.css"
import { useApp, useAuth } from "../../Tools/Hooks";
import { resolve } from "dns";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
// import { getCurrentUser, seedNotification } from "../database/firebase-functions";

interface NotificationItemProps {
  notification: NotificationModel
  handleClick: Function
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, handleClick }) => {
  const app = useApp()
  const auth = useAuth()


  const {
    id,
    title,
    description,
    // date,
    url,
    createdBy,
    seedForUsers
  } = notification

  function onMarkReaded() {
    updateDoc(doc(app.firestore, NOTIFICATIONS_COLLECTION, id!), { seedForUsers: arrayUnion(auth.user?.uid) }).then(notificationSnapshot => {
      console.log("Marked on Readed");
    }).catch(error => {
      console.log("Marked on Readed", error.message)
    })
  }

  const seed = () => {
    
    if (auth.user) return seedForUsers.includes(auth.user.uid)
    else return false
    return true
  }

  function marckAndClose() {
    onMarkReaded()
    handleClick()
  }

  return (
    <MenuItem className={seed() ? "NotificationItem" : "NotificationItemUnread"}>
      <LinkStyled to={url} onClick={() => marckAndClose()} className="NotificationInformation">
        <Typography variant="overline" display="block" gutterBottom>
          {title}
        </Typography>
        <Typography variant="caption" display="block" gutterBottom className="Description">
          {description}
        </Typography>
      </LinkStyled>
      {!seed() &&
        <IconButton onClick={onMarkReaded}>
          <MarkChatReadIcon />
        </IconButton>
      }
    </MenuItem>
  );
}
export default NotificationItem;

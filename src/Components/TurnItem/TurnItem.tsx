import { Delete, AssignmentInd, Edit, Assignment, Save, WhatsApp } from "@mui/icons-material";

import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';              // User.
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';            // Warning.
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';    // Success.
import EventSeatIcon from '@mui/icons-material/EventSeat';                      // Asiento.

import { Box, IconButton, Link, ListItem, ListItemIcon, ListItemText, TextField } from "@mui/material";
import { updateDoc, collection, doc, deleteDoc } from "firebase/firestore";
import { useState } from "react";
import Turn, { getNewDateWithNewTime, getTime, turnConverter, TURNS_COLLECTION } from "../../Models/Turn";
import { useApp } from "../../Tools/Hooks";

interface TurnItemProps {
  turn: Turn,
  handleEdit: () => void
}
function TurnItem({ turn, handleEdit }: TurnItemProps) {
  const app = useApp();

  function handleRemove(): void {
    if (window.confirm("¿Vas a borrar este turno?"))
      if (turn.reservedBy) {
        if (window.confirm("Este turno tiene una reserva, ¿Igual lo vas a borrar?"))
          deleteDoc(doc(app.firestore, TURNS_COLLECTION, turn.id!)).then(r => console.log("Deleted ", r)).catch(e => console.log("Deleted error ", e))
      } else
        deleteDoc(doc(app.firestore, TURNS_COLLECTION, turn.id!)).then(r => console.log("Deleted ", r)).catch(e => console.log("Deleted error ", e))
  }

  return (
    <ListItem
      sx={{
        paddingLeft: 4,
      }}
    >
      <ListItemIcon>
        {turn.reservedBy ?
          <AssignmentInd color="success" />
          :
          <Assignment />
        }
      </ListItemIcon>
        <ListItemText
          primary={`${getTime(turn)} hs`}
          secondary={turn.reservedBy ? `${turn.reservedBy.name} Tel: ${turn.reservedBy.phone}` : ""}
        />
          {turn.reservedBy &&
            <Link target="_blank" href={`https://wa.me/54${turn.reservedBy.phone}`}>
              <IconButton><WhatsApp color="success" /></IconButton>
            </Link>
          }
          <IconButton onClick={e => handleEdit()} color="primary" aria-label="delete">
            <Edit />
          </IconButton>
          <IconButton onClick={e => handleRemove()} color="error" edge="end" aria-label="delete">
            <Delete />
          </IconButton>
    </ListItem>
  )
}

export default TurnItem;
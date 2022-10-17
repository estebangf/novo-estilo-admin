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
  turn: Turn
}
function TurnItem({ turn }: TurnItemProps) {
  const app = useApp();

  const [edit, setEdit] = useState<Turn>()

  function handleEdit(): void {
    setEdit(turn);
  }

  function handleRemove(): void {
    if (window.confirm("¿Vas a borrar este turno?"))
      if (turn.reservedBy) {
        if (window.confirm("Este turno tiene una reserva, ¿Igual lo vas a borrar?"))
          deleteDoc(doc(app.firestore, TURNS_COLLECTION, turn.id!)).then(r => console.log("Deleted ", r)).catch(e => console.log("Deleted error ", e))
      } else
        deleteDoc(doc(app.firestore, TURNS_COLLECTION, turn.id!)).then(r => console.log("Deleted ", r)).catch(e => console.log("Deleted error ", e))
  }

  function handleSave(): void {
    if (turn.id)
      updateDoc(doc(app.firestore, TURNS_COLLECTION, turn.id).withConverter(turnConverter), edit).then(r => {
        console.log("save edited turn: ", r)
        setEdit(undefined)
      }).catch(e => {
        console.error("error new turn: ", e)
      })
  }

  function handleChange(value: string): void {
    if (edit)
      setEdit({ ...edit, date: getNewDateWithNewTime(edit, value) })
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
      {edit ?
        <TextField
          id="time"
          label="Alarm clock"
          type="time"
          value={getTime(edit)}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
          sx={{ width: 150 }}
          onChange={e => handleChange(e.target.value)}
        />
        :
        <ListItemText
          primary={`${getTime(turn)} hs`}
          secondary={turn.reservedBy ? `${turn.reservedBy.name} Tel: ${turn.reservedBy.phone}` : ""}
        />
      }
      {edit ?
        <IconButton onClick={e => handleSave()} color="error" edge="end" aria-label="delete">
          <Save />
        </IconButton>
        :
        <>
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
        </>
      }
    </ListItem>
  )
}

export default TurnItem;
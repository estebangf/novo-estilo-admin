import { Delete, AssignmentInd, Edit, Assignment, Save, WhatsApp } from "@mui/icons-material";

import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';              // User.
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';            // Warning.
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';    // Success.
import EventSeatIcon from '@mui/icons-material/EventSeat';                      // Asiento.

import { Box, IconButton, Link, ListItem, ListItemIcon, ListItemText, TextField, Typography } from "@mui/material";
import { updateDoc, collection, doc } from "firebase/firestore";
import { useState } from "react";
import Turn, { getExtenseDate, getNewDateWithNewTime, getTime, turnConverter, TURNS_COLLECTION } from "../../Models/Turn";
import { useApp } from "../../Tools/Hooks";

interface TurnItemSimpleProps {
  turn: Turn,
  extended?: boolean
}
function TurnItemSimple({ turn, extended }: TurnItemSimpleProps) {

  return (
    <ListItem
    divider={extended}
      dense={extended}
      sx={{
        // textAlign: "center",
        // paddingLeft: 4,
        textDecoration: !extended && turn.reservedBy ? "line-through" : "",
        // "-webkit-text-stroke-width": !extended && turn.reservedBy ? "" : "medium"
      }}
    >
      <ListItemText
        sx={{
          marginTop: extended ? 0 : null,
          marginBottom: extended ? 0 : null,
        }}
        primary={<div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          {extended && <Typography
            variant="subtitle1"
            component="h1"
            sx={{
              fontWeight: turn.reservedBy ? "600" : null,
            }}
          >{turn.reservedBy?.name || "Libre"}:{" "}</Typography>}
          <Typography
            variant={extended ? "subtitle2" : "subtitle1"}
            component="h2"
          >{getExtenseDate(turn)}</Typography>
        </div>}
      />
    </ListItem >
  )
}

export default TurnItemSimple;
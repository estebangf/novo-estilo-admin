import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Paper, List, ListSubheader, IconButton, Collapse, Button, Dialog, DialogContent, Typography } from "@mui/material";
import { onSnapshot, query, collection, orderBy, where, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import TurnItem, { TurnItemSimple } from "../../Components/TurnItem";
import TurnsImage from "../../Components/TurnsImage";
import Turn, { TURNS_COLLECTION, turnConverter } from "../../Models/Turn";
import { useApp } from "../../Tools/Hooks";

function TurnsToDay() {
  const app = useApp();

  const [turns, setTurns] = useState<Turn[]>([])
  const [viewImage, setViewImage] = useState(false)

  useEffect(() => {
    let inicio = new Date();
    inicio.setHours(0);
    inicio.setMinutes(0);
    inicio.setSeconds(0);
    inicio.setMilliseconds(0);
    let end = new Date();
    end.setHours(23);
    end.setMinutes(59);
    end.setSeconds(59);
    end.setMilliseconds(99);

    console.log("inicio: ", inicio, "end: ", end)
    // const q = query(collection(db, TURNS_COLLECTION), where("date", ">", "CA"));
    const unsubscribe = onSnapshot(query(
      collection(app.firestore, TURNS_COLLECTION),
      where("date", ">=", Timestamp.fromDate(inicio)),
      where("date", "<=", Timestamp.fromDate(end)),
      orderBy("date")
    ).withConverter(turnConverter), (querySnapshot) => {
      let turnsSnapshot: Turn[] = [];
      querySnapshot.forEach((turn) => {
        turnsSnapshot.push(turn.data());
      });
      setTurns(turnsSnapshot)
    });
  }, [])


  return (
    <Box sx={{
      padding: 2,
      paddingBottom: 8
    }}>
      <TurnsImage turns={turns} />
      <TurnsImage turns={turns} extended={true} />
      {turns.map((turn, index) => {
        return (
          <TurnItem turn={turn} />
        )
      })}
    </Box>
  )
}

export default TurnsToDay;
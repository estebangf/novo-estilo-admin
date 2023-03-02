import { Add, ExpandLess, ExpandMore, Inbox } from "@mui/icons-material";
import { Box, Button, Collapse, Dialog, DialogActions, DialogTitle, Fab, FormControlLabel, FormGroup, IconButton, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Paper, Switch, TextField, Zoom } from "@mui/material";
import { addDoc, collection, doc, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import DialogTurn from "../../Components/DialogTurn/DialogTurn";
import TurnItem from "../../Components/TurnItem";
import TurnsImage from "../../Components/TurnsImage";
import Turn, { getDate, getFullDate, getNewDateWithNewTime, turnConverter, TurnsListExtra, TURNS_COLLECTION } from "../../Models/Turn";
import { Works } from "../../Models/Work";
import { getDateValue } from "../../Tools";
import { useApp } from "../../Tools/Hooks";


function TurnsList() {
  const app = useApp();

  const [desde, setDesde] = useState<Date>(new Date())
  const [hasta, setHasta] = useState<Date>(
    new Date((new Date()).setDate((new Date()).getDate() + 7))
  )
  const [dateView, setDateView] = useState<number>()
  const [viewReserveds, setViewReserveds] = useState(true)
  const [viewOpeneds, setViewOpeneds] = useState(true)
  const [turns, setTurns] = useState<Turn[]>([])
  const [turnsList, setTurnsList] = useState<TurnsListExtra>([])
  const [dialogTurn, setDialogTurn] = useState<Turn>()

  useEffect(() => {
    // const q = query(collection(db, TURNS_COLLECTION), where("date", ">", "CA"));
    const unsubscribe = onSnapshot(query(
      collection(app.firestore, TURNS_COLLECTION),
      orderBy("date")
    ).withConverter(turnConverter), (querySnapshot) => {
      let turnsSnapshot: Turn[] = [];
      querySnapshot.forEach((turn) => {
        turnsSnapshot.push(turn.data());
      });
      setTurns(turnsSnapshot)
    });
  }, [])

  const filterTurns = () => {
    let inicio = new Date(desde);
    inicio.setHours(0, 0, 0, 0);
    let fin = new Date(hasta);
    fin.setHours(23, 59, 59, 999);

    return turns
      .filter(t => t.date > inicio)
      .filter(t => t.date < fin)
      .filter(t => viewReserveds || !t.reservedBy)
      .filter(t => viewOpeneds || !!t.reservedBy)
  }

  useEffect(() => {
    let dates: TurnsListExtra = [];
    filterTurns().map(t => {
      let index = dates.findIndex(e => e.date == getDate(t))
      if (index != -1)
        dates[index].turns.push(t)
      else
        dates.push({
          date: getDate(t),
          turns: [t]
        })
    })

    setTurnsList([...dates])
    setDateView(undefined)
  }, [turns, desde, hasta, viewReserveds, viewOpeneds])

  const handleChangeView = (index: number) => {
    setDateView(prev => prev === index ? undefined : index)
  }

  function setDesdeHandle(value: string) {
    let dateExtra = new Date(value);
    dateExtra.setMinutes(dateExtra.getMinutes() + dateExtra.getTimezoneOffset());

    setDesde(dateExtra)
  }
  function setHastaHandle(value: string) {
    let dateExtra = new Date(value);
    dateExtra.setMinutes(dateExtra.getMinutes() + dateExtra.getTimezoneOffset());

    setHasta(dateExtra)
  }


  function handleSaveTurn(): void {
    if (!dialogTurn) return;

    if (dialogTurn.id)
      updateDoc(doc(app.firestore, TURNS_COLLECTION, dialogTurn.id).withConverter(turnConverter), dialogTurn).then(r => {
        setDialogTurn(undefined)
      }).catch(e => {
        console.error("error new turn: ", e)
      })
    else
      addDoc(collection(app.firestore, TURNS_COLLECTION).withConverter(turnConverter), dialogTurn).then(r => {
        setDialogTurn(undefined)
      }).catch(e => {
        console.error("error new turn: ", e)
      })
  }


  return (
    <Box sx={{
      padding: 2,
      paddingBottom: 8
    }}>
      <TurnsImage turns={filterTurns()} extended={!viewOpeneds} />
      <TextField
        id="date"
        label="Desde"
        type="date"
        value={getDateValue(desde)}
        onChange={e => setDesdeHandle(e.target.value)}
        sx={{ width: 250, marginBottom: 2, marginRight: 2 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="date"
        label="Hasta"
        type="date"
        value={getDateValue(hasta)}
        onChange={e => setHastaHandle(e.target.value)}
        sx={{ width: 250, marginBottom: 2, marginRight: 2 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <br />
      <FormGroup>
        <FormControlLabel control={<Switch checked={viewReserveds} onChange={e => setViewReserveds(prev => !prev)} />} label="Mostrar reservados" />
        <FormControlLabel control={<Switch checked={viewOpeneds} onChange={e => setViewOpeneds(prev => !prev)} />} label="Mostrar los libres" />
      </FormGroup>
      {turnsList.map((date, index) => {
        let open = index === dateView
        return (
          <Paper
            sx={{
              background: open ? "#fff" : "transparent"
            }}
            elevation={open ? 2 : 0} >
            <List
              sx={{
                background: "transparent"
              }}
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader
                  onClick={() => handleChangeView(index)}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: "transparent"
                  }} id="nested-list-subheader">
                  {date.date}
                  <IconButton edge="end" aria-label="delete">
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </ListSubheader>
              }
            >
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List>
                  {date.turns.map(turn => <TurnItem handleEdit={() => setDialogTurn(turn)} turn={turn} />)}
                </List>
              </Collapse>
            </List >
          </Paper>
        )
      })}
      <Zoom
        in={true}
      >
        <Fab
          onClick={e => setDialogTurn({
            createdAt: new Date(),
            date: new Date(),
            reservedBy: null,
            works: [],
            allowedWorks: []
          })}
          sx={{
            position: "fixed",
            bottom: 12,
            right: 12
          }}
          color="primary" aria-label="add">
          <Add />
        </Fab>
      </Zoom>
      {dialogTurn &&
        <DialogTurn
          turn={dialogTurn}
          handleChangeDialogTurn={setDialogTurn}
          handleSaveTurn={handleSaveTurn}
        />
      }
    </Box >
  )
}

export default TurnsList;
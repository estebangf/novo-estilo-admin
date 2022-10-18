import { Add, ExpandLess, ExpandMore, Inbox } from "@mui/icons-material";
import { Box, Button, Collapse, Dialog, DialogActions, DialogTitle, Fab, FormControlLabel, FormGroup, IconButton, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Paper, Switch, TextField, Zoom } from "@mui/material";
import { addDoc, collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import TurnItem from "../../Components/TurnItem";
import TurnsImage from "../../Components/TurnsImage";
import Turn, { getDate, getFullDate, turnConverter, TurnsListExtra, TURNS_COLLECTION } from "../../Models/Turn";
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
  const [newTurn, setNewTurn] = useState<Turn>()

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

    console.log("inicio: ", inicio)
    console.log("fin: ", fin)
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
  }, [turns, desde, hasta, viewReserveds, viewOpeneds])

  const handleChangeView = (index: number) => {
    setDateView(prev => prev === index ? undefined : index)
  }
  function handleViewNewTurn(turn?: Turn): void {
    setNewTurn(turn)
  }
  function handleSaveNewTurn(): void {
    if (newTurn)
      // setTurns(prev => [...prev, newTurn])
      addDoc(collection(app.firestore, TURNS_COLLECTION).withConverter(turnConverter), newTurn).then(r => {
        console.log("added new turn: ", r)
        setNewTurn(undefined)
      }).catch(e => {
        console.error("error new turn: ", e)
      })
  }
  function handleChangeNewTurn(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    // console.log("new turn: ", e.target.value, new Date(e.target.value))
    setNewTurn({ createdAt: new Date(), date: new Date(e.target.value), reservedBy: null, works: []})
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
                  {date.turns.map(turn => <TurnItem turn={turn} />)}
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
          onClick={e => handleViewNewTurn({ createdAt: new Date(), date: new Date(), reservedBy: null, works: [] })}
          sx={{
            position: "fixed",
            bottom: 12,
            right: 12
          }}
          color="primary" aria-label="add">
          <Add />
        </Fab>
      </Zoom>
      {newTurn &&
        <Dialog onClose={() => handleViewNewTurn()} open={!!newTurn}>
          <DialogTitle>Nuevo turno</DialogTitle>
          <TextField
            id="datetime-local"
            label="Next appointment"
            type="datetime-local"
            value={getFullDate(newTurn)}
            onChange={e => handleChangeNewTurn(e)}
            sx={{ width: 250 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <DialogActions>
            <Button onClick={() => handleViewNewTurn()} color="secondary">Cancelar</Button>
            <Button onClick={() => handleSaveNewTurn()} variant="contained" color="primary">Guardar</Button>
          </DialogActions>
        </Dialog>
      }
    </Box >
  )
}

export default TurnsList;
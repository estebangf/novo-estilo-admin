import { Dialog, DialogTitle, TextField, DialogActions, Button, Avatar, Checkbox, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, ListSubheader, DialogContent, Typography } from "@mui/material"
import Turn, { getFullDate } from "../../Models/Turn"
import { WorkNameType, Works } from "../../Models/Work"
import ListItemWork from "../ListItemWork/ListItemWork"

interface Props {
  turn: Turn,
  handleChangeDialogTurn: (turn?: Turn) => void
  handleSaveTurn: () => void
}
function DialogTurn({
  turn,
  handleChangeDialogTurn,
  handleSaveTurn,
}: Props) {



  function handleChangeDateTurn(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    // console.log("new turn: ", e.target.value, new Date(e.target.value))
    handleChangeDialogTurn({ ...turn, date: new Date(e.target.value) })
  }

  const changeWorks = (e: WorkNameType) => {
    let newWork = e;
    let typeTurns: keyof Turn = "allowedWorks"
    if (turn.reservedBy)
      typeTurns = "works";

    let newWorks: WorkNameType[] = []
    if (turn[typeTurns].includes(newWork))
      newWorks = turn[typeTurns].filter(_work => _work !== newWork)
    else
      newWorks = [...turn[typeTurns], newWork]

    console.log("newWorks", newWorks)

    console.log("TURN", {
      ...turn,
      [typeTurns]: newWorks
    })
    handleChangeDialogTurn({
      ...turn,
      [typeTurns]: newWorks
    })
  }

  return (
    <Dialog onClose={() => handleChangeDialogTurn()} open={!!turn}>
      <DialogTitle>{turn.id ? "Editar" : "Nuevo"} turno<br />
        {turn.reservedBy?.name}
      </DialogTitle>
      <DialogContent>
        <TextField
          id="datetime-local"
          label="Next appointment"
          type="datetime-local"
          value={getFullDate(turn)}
          onChange={e => handleChangeDateTurn(e)}
          sx={{ mt: 1, width: 250 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <ListSubheader>
            Trabajos {turn.reservedBy ? "reservados" : "habilitados"}
          </ListSubheader>
          {Works.map(_work => {
            let works = turn.reservedBy ? turn.works : turn.allowedWorks;
            return <ListItemWork _work={_work} checked={works.indexOf(_work.name) !== -1} changeWorks={changeWorks} />
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleChangeDialogTurn()} color="secondary">Cancelar</Button>
        <Button onClick={() => handleSaveTurn()} variant="contained" color="primary">Guardar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogTurn
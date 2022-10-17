import { Button, Dialog, DialogContent, List, Paper, Typography } from "@mui/material"
import { useState } from "react"
import Turn from "../../Models/Turn"
import TurnItem, { TurnItemSimple } from "../TurnItem"

interface TurnsImageProps {
  turns: Turn[],
  extended?: boolean
}
function TurnsImage({ turns, extended }: TurnsImageProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button fullWidth onClick={e => setOpen(true)}>Generar imagen {extended && "con nombres"}</Button>
      <Dialog
        fullScreen
        open={open}
        onClick={e => setOpen(false)}
      >
        <DialogContent sx={{
          backgroundImage: 'url("/example.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex"
        }}
        >
          <Paper
            elevation={4}
            sx={{
              margin: "auto",
              background: "#ffffffb3",
              width: "fit-content",
              height: "fit-content",
              textAlign: "center",
              padding: extended ? 0 : 2,
              paddingTop: 2,
              paddingBottom: 2,
            }}>
            <Typography variant="h5" component="h1">Turnos disponibles</Typography>
            {/* {turns.filter(t => !t.reservedBy).map((turn, index) => { */}
            <List dense={turns.length > 10}>
              {turns.map((turn, index) => <TurnItemSimple turn={turn} extended={extended} />)}
            </List>
          </Paper>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TurnsImage
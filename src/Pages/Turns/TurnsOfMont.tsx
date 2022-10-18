import {
  Container,
  Stack,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Fab,
  Typography,
  Grid,
  FormControl,
  FormControlLabel,
  InputLabel,
  Checkbox,
  MenuItem,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Divider,
  Chip,
  Avatar,
  List,
  ListItem,
  Link,
  IconButton,
  Box,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import { useEffect, useState } from 'react';

import { Add, LockClock, Timer, Person, WhatsApp, Phone, Room, AttachMoney } from '@mui/icons-material';

import './TurnsOfMont.css'
import Turn, { turnConverter, TURNS_COLLECTION } from '../../Models/Turn';

import { styled } from '@mui/material/styles';
import { onSnapshot, query, collection, orderBy } from 'firebase/firestore';
import LinkStyled from '../../Components/LinkStyled';
import { useApp } from '../../Tools/Hooks';
import { Works } from '../../Models/Work';


const FabStyled = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: 16,
  right: 16,
}));


const DIAS = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sábado"
]

const AÑOS = [
  2021,
  2022
]

const MESES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
]

interface Dia {
  n?: number,
  r: Turn[]
}

const TurnsOfMont: React.FC = () => {
  const app = useApp();

  const [turns, setTurns] = useState<Turn[]>([])
  const [turnSelected, setReservationSelected] = useState<Turn>()
  const [mostrarDomingo, setMostrarDomingo] = useState<boolean>(false)
  const [mostrarLibres, setMostrarLibres] = useState<boolean>(false)
  const [año, setAño] = useState<number>((new Date()).getFullYear())
  const [mes, setMes] = useState<number>((new Date()).getMonth())


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

  function semanas() {
    let ss: Dia[][] = []
    let ds: Dia[] = []
    let diaSemana = 0;
    let dateOfMonth = new Date();
    dateOfMonth.setFullYear(año, mes, 1)
    let lastDateOfMonth = new Date();
    lastDateOfMonth.setFullYear(año, mes + 1, 0)
    let monthFinished = true
    do {
      monthFinished = dateOfMonth.getDate() != lastDateOfMonth.getDate()
      if (diaSemana == dateOfMonth.getDay()) {
        // if (diaSemana != 0 || mostrarDomingo)
        ds.push({
          n: dateOfMonth.getDate(),
          r: turns.filter(t => mostrarLibres || !!t.reservedBy).filter(res => {
            let d = res.date
            return d.getMonth() == dateOfMonth.getMonth() &&
              d.getDate() == dateOfMonth.getDate() &&
              d.getFullYear() == dateOfMonth.getFullYear()
          })
        })
        // else
        //   ds.push(0)
        dateOfMonth.setFullYear(año, mes, dateOfMonth.getDate() + 1)
      } else {
        // if (diaSemana != 0 || mostrarDomingo)
        ds.push({ r: [] })
        // else
        //   ds.push(0)
      }
      if (++diaSemana == 7) {
        diaSemana = 0
        ss.push(ds)
        ds = []
      }
    } while (monthFinished)
    for (let i = diaSemana; i < 7; i++) {
      ds.push({ r: [] })
    }
    ss.push(ds)
    ds = []
    return ss;
  }
  return (
    <div className="TurnsOfMont">
      <div className="Content">
        <Container
          className="login-grid"
          maxWidth="md"
        >
          <Stack
            className="Stack"
            direction="column"
            justifyContent="center"
            spacing={2}
          >

            <FormControl fullWidth>
              <InputLabel id="select-label-año">Año</InputLabel>
              <Select
                labelId="select-label-año"
                id="select-año"
                value={año}
                label="Año"
                onChange={e => setAño(parseInt(e.target.value as string))}
              >
                {AÑOS.map((a, i) => {
                  return <MenuItem value={a}>{a}</MenuItem>
                })}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="select-label-mes">Mes</InputLabel>
              <Select
                labelId="select-label-mes"
                id="select-mes"
                value={mes}
                label="Mes"
                onChange={e => setMes(parseInt(e.target.value as string))}
              >
                {MESES.map((m, i) => {
                  return <MenuItem value={i}>{m}</MenuItem>
                })}
              </Select>
            </FormControl>

            <FormControlLabel
              label="Mostrar Domingo"
              control={
                <Checkbox
                  checked={mostrarDomingo}
                  onChange={e => setMostrarDomingo(!mostrarDomingo)}
                />
              }
            />

            <FormControlLabel
              label="Mostrar Libres"
              control={
                <Checkbox
                  checked={mostrarLibres}
                  onChange={e => setMostrarLibres(!mostrarLibres)}
                />
              }
            />
            <TableContainer component={Paper} elevation={4} className="DataGrid">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {DIAS.map((dia, indexDia) => {
                      if (indexDia == 0 && mostrarDomingo || indexDia != 0)
                        return <TableCell align="center">{dia}</TableCell>
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {semanas().map((semana, indexSemana) => {
                    return (
                      <TableRow
                        key={"s_" + indexSemana}
                        sx={{ '&:last-child td, &:last-child let th': { borderBottom: 0 } }}
                      >
                        {semana.map((dia, indexDia) => {
                          if (indexDia == 0 && mostrarDomingo || indexDia != 0)
                            return <TableCell align="right">
                              <div className="day">
                                {dia.n}
                                {dia.r.length ? dia.r.map((rs, indexR) => {
                                  return <Chip color={rs.reservedBy ? rs.date.getTime() > (new Date()).getTime() ? "primary" : "secondary" : "default"} sx={{ mb: 1 }} onClick={e => setReservationSelected(rs)} label={<>
                                    {rs.reservedBy?.name} {rs.date.toLocaleTimeString().slice(0, 5)}hs
                                  </>}
                                  />
                                }) : ""}
                              </div>
                            </TableCell>
                        })}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Container>
      </div>

      {
        (turnSelected && turnSelected.id && turnSelected.reservedBy) &&
        <Dialog onClose={e => setReservationSelected(undefined)} open={!!turnSelected}>
          <DialogTitle>{turnSelected.reservedBy.name}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <List sx={{ pt: 0, pb: 1 }}>
                <ListItem sx={{ pt: 0, pl: 0 }}>
                  <ListItemIcon>
                    <Timer fontSize='medium' color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={`${turnSelected.date.toLocaleString().slice(0, 16)}hs`} />
                </ListItem>
                <ListItem sx={{ pt: 0, pl: 0 }}>
                  <ListItemIcon>
                    <Link target="_blank" href={`https://wa.me/54${turnSelected.reservedBy.phone}`}>
                      <WhatsApp fontSize='medium' color="success" />
                    </Link>
                  </ListItemIcon>
                  <ListItemText primary={turnSelected.reservedBy.phone} />
                </ListItem>
                <Typography variant="h6">Retoques</Typography>
                {turnSelected.works?.map(work => <ListItem sx={{ pt: 0, pl: 0 }}>
                  <ListItemIcon>
                    <Avatar sx={{ height: 24, width: 24 }} src={Works.find(w => w.name == work)?.img} />
                  </ListItemIcon>
                  <ListItemText primary={work} />
                </ListItem>
                )}
              </List>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      }
    </div >
  );
};

export default TurnsOfMont;
import { DocumentData } from "firebase/firestore"

import { Timestamp } from "firebase/firestore"
import Unregistred from "./Unregistred"
import { WorkNameType } from "./Work"

const TURNS_COLLECTION = "turns"

interface Turn {
  id?: string
  createdAt: Date
  date: Date
  reservedBy: Unregistred | null
  allowedWorks: WorkNameType[]
  works: WorkNameType[]
}
const getDate = (turn: Turn) => {
  return turn.date.toLocaleDateString()
}
const getExtenseDate = (turn: Turn) => {
  let days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ]
  // return turn.date.toLocaleString()
  return `${days[turn.date.getDay()]} ${turn.date.getDate()}/${turn.date.getMonth() + 1}, ${turn.date.getHours()}:${turn.date.getMinutes() < 10 ? "0" + turn.date.getMinutes() : turn.date.getMinutes()} hs.`
}
const getTime = (turn: Turn) => {
  return turn.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
const getFullDate = (turn: Turn) => {
  let dateExtra = new Date(turn.date);
  dateExtra.setMinutes(dateExtra.getMinutes() - dateExtra.getTimezoneOffset());
  return dateExtra.toISOString().slice(0, 16);
  // return dateExtra.toISOString().split(":00.000")[0]; // "yyyy-MM-ddThh:mm"
}
const getNewDateWithNewTime = (turn: Turn, time: string) => {
  let lastDate = turn.date;
  let newDate = new Date(lastDate.toLocaleDateString('es-AR') + " " + time);
  newDate.setDate(lastDate.getDate());
  newDate.setMonth(lastDate.getMonth());
  newDate.setFullYear(lastDate.getFullYear());
  return newDate;
}



// Firestore data converter
const turnConverter = {
  toFirestore: (turn: Turn) => {
    return {
      createdAt: Timestamp.fromDate(turn.createdAt),
      date: Timestamp.fromDate(turn.date),
      reservedBy: turn.reservedBy,
      works: turn.works,
      allowedWorks: turn.allowedWorks
    }
  },
  fromFirestore: (snapshot: DocumentData, options: any) => {
    const data = snapshot.data(options)
    let newTurn: Turn = {
      id: snapshot.id,
      createdAt: data.createdAt.toDate(),
      date: data.date.toDate(),
      reservedBy: data.reservedBy,
      works: data.works || [],
      allowedWorks: data.allowedWorks || []
    }
    return newTurn;
  },
}


const generateTurn = (number: number) => {
  return {
    createdAt: new Date(),
    date: new Date(number),
    reservedBy: number % 2 == 0 ? {
      name: "Nombre y apellido...",
      phone: 2944617548
    } : null,
    works: [],
    allowedWorks: []
  }
}
const turnsExamples: Turn[] = Array.from(Array(Math.ceil(Math.random() * 15)).keys()).map(e => generateTurn(Math.ceil(Math.random() * 500000000) + 1650000000000))

export {
  TURNS_COLLECTION,
  turnConverter,
  turnsExamples,
  getDate,
  getExtenseDate,
  getTime,
  getFullDate,
  getNewDateWithNewTime,
}
export type TurnsListExtra = {
  date: string,
  turns: Turn[]
}[]
export default Turn;
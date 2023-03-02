import { useEffect, useState } from 'react';

import { styled } from '@mui/material/styles';
import { Grid, Card, CardHeader, CardContent, AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { useNavigate } from 'react-router';


import "./Home.css"
import OptionCard from '../../Components/OptionCard';
import { useAuth } from '../../Tools/Hooks';

const tarjetas = [
  {
    title: "Lista de Turnos",
    subTitle: "Ingresa para ver la lista de turnos e incluso hacer modificaciones.",
    description: "Alta y baja de turnos.",
    image: "/statics/imagens/menus/turnos_disponibles.png",
    link: "/turns/list",
    disabled: false,
    roles: ["admin"]
  }, {
    title: "Agenda del dia",
    subTitle: "Aquí verás los turnos actualmente fijados y que debes atender.",
    description: "Modo lista",
    image: "/statics/imagens/menus/agenda_diaria.png",
    link: "/turns/today",
    disabled: false,
    roles: ["admin"]
  }, {
    title: "Agenda mensual de turnos",
    subTitle: "Aquí verás los turnos actualmente fijados y que debes atender.",
    description: "Calendario mensual",
    image: "/statics/imagens/menus/agenda_mensual.png",
    link: "/turns/month",
    disabled: false,
    roles: ["admin"]
  },
  // {
  //   title: "Nuevo Movimiento",
  //   subTitle: "Agregar un movimiento a la lista financiera.",
  //   description: "Monto, description, etc.",
  //   image: "/statics/imagens/menus/nuevo_movimiento.png",
  //   link: "/movements/new",
  //   disabled: true,
  //   roles: ["admin"]
  // }, {
  //   title: "Movimientos",
  //   subTitle: "Estas son las transacciones de dinero del emprendimiento",
  //   description: "Revisar, filtrar, etc.",
  //   image: "/statics/imagens/menus/ver_movimientos.png",
  //   link: "/movements/list",
  //   disabled: true,
  //   roles: ["admin"]
  // }, {
  //   title: "Mi cuenta",
  //   subTitle: "Tus datos e informacion",
  //   description: "Aquí puedes encontrar tu informacion y datos personales que te identifican ante la distribuidora",
  //   image: "/statics/imagens/menus/mi_cuenta.png",
  //   link: "/account",
  //   disabled: true,
  //   roles: ["user"]
  // }, {
  //   title: "Administracion",
  //   subTitle: "Panel de cambios",
  //   description: "Aquí podrá acceder a acciones privadas para gestionar su lista de productos",
  //   image: "/statics/imagens/menus//administracion.png",
  //   link: "/settings",
  //   disabled: true,
  //   roles: ["admin"]
  // }
]


interface HomeProps {
}
const Home: React.FC<HomeProps> = () => {
  const auth = useAuth()

  return (
    <div className="Home">
      <div className="Content">
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="stretch"
          spacing={4}
        >
          {tarjetas.filter(t => {
            return !!t.roles.filter(r => {
              return auth.profile?.roles.includes(r) || r == "publico"
            }).length
          }).map(t => {
            return (
              <Grid sx={{ position: "relative" }} item xs={11} sm={10} md={4} xl={3}>
                {t.disabled && <span style={{
                  background: "#ffffff",
                  position: "absolute",
                  width: "calc(100% - 32px)",
                  height: "calc(100% - 32px)",
                  top: 0,
                  left: 0,
                  opacity: 0.75,
                  marginLeft: 32,
                  marginTop: 32,
                }} />}
                <OptionCard
                  {...t}
                />
              </Grid>
            )
          })}
        </Grid>
      </div>
    </div >
  )
}

export default Home;
import { ButtonBase, Grid } from "@mui/material"
import { useNavigate } from "react-router-dom"
import LinkStyled from "../../Components/LinkStyled"

import styles from "./NotFound.module.css"

function NotFound() {
  const navigate = useNavigate()
  return (
    <div className={styles.page}>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={4}
      >
        <Grid item xs={12} sm={7}>
          <img className={styles.img} src="/not-found.png" />
        </Grid>
        <Grid item xs={12} sm={5}>
          <h1 className={styles.title}>Oops!!</h1>
          <h2 className={styles.subtitle}>Page Not Found</h2>
          <h3 className={styles.text}>La pagina donde intenta acceder no fue encontrada.
            Por favor, dirijase al inicio para continuar</h3>
          <ButtonBase><LinkStyled to="/" className={styles.button}>Ir al Inicio</LinkStyled></ButtonBase>
          <ButtonBase onClick={() => navigate(-1)}><div className={styles.button}>Volver Atras</div></ButtonBase>
        </Grid>
      </Grid>
    </div>
  )
}
export default NotFound;
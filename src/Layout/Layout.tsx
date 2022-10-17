import { useState } from "react";
import { Outlet } from "react-router-dom";
import AppBarStyled from "../Components/AppBarStyled/AppBarStyled";
import AppMenu from "../Components/AppMenu/AppMenu";
import Main from "../Components/Main/Main";

function Layout() {
  const [openDrawerMovile, setOpenDrawerMovile] = useState(false);
  const [openDrawerDesktop, setOpenDrawerDesktop] = useState(true);
  return (
    <div style={{ display: 'flex' }}>
      <AppMenu setOpenDrawerMovile={setOpenDrawerMovile} openDrawerMovile={openDrawerMovile} setOpenDrawerDesktop={setOpenDrawerDesktop} openDrawerDesktop={openDrawerDesktop} />
      <Main sx={{
        position: "relative",
        width: "100%",
      }} open={openDrawerDesktop}>
        <AppBarStyled openDrawerDesktop={openDrawerDesktop} setOpenDrawerMovile={setOpenDrawerMovile} setOpenDrawerDesktop={setOpenDrawerDesktop} />
        <Outlet />
      </Main>
    </div >
  );
}

export default Layout;
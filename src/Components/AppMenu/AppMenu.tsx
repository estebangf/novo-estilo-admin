import DrawerCustom from './DrawerCustom';
import { drawerWidth } from './DrawerHeader';

interface AppMenuProps {
  openDrawerMovile: boolean,
  setOpenDrawerMovile: Function,
  openDrawerDesktop: boolean,
  setOpenDrawerDesktop: Function
}

const AppMenu: React.FC<AppMenuProps> = ({ openDrawerDesktop, setOpenDrawerDesktop, openDrawerMovile, setOpenDrawerMovile }) => {

  return (
    <>
      <DrawerCustom
        closeDrawer={() => setOpenDrawerMovile(false)}
        open={openDrawerMovile}
        variant="temporary"
        width={drawerWidth}
        sx={{
          display: { xs: 'block', sm: 'none' },
        }}
      />

      <DrawerCustom
        closeDrawer={() => setOpenDrawerDesktop(false)}
        width={openDrawerDesktop ? drawerWidth : 72 + 12}
        variant="permanent"
        open={openDrawerDesktop}
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            margin: "12px",
            marginRight: 0,
            // width: ,
            // transition: "width 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            // boxSizing: "border-box",
            borderRadius: "12px",
            height: "calc(100% - 24px)",
            // overflowX: "hidden"
          }
        }}
      />
    </>
  );
}

export default AppMenu;
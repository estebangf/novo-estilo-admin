import { SxProps, Theme, useTheme } from '@mui/material/styles';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { IconButton, Divider, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DrawerHeader from "./DrawerHeader";
import LinkStyled from "../LinkStyled"
import { useLocation } from 'react-router-dom';


function createOptionMenu(text: string, to: string | undefined, action: Function | undefined) {
  return {
    text,
    to,
    action
  }
}
const optionsMenu = [
  createOptionMenu('Home', '/', undefined),
  createOptionMenu('Login', '/login', undefined),
  createOptionMenu('Register', '/register', undefined),
  createOptionMenu('Log Out', undefined, function logout() {
    alert("LogOut")
  }),
]


interface DrawerCustomProps {
  width: number,
  open: boolean,
  closeDrawer: Function,
  variant: DrawerProps["variant"],
  sx: SxProps<Theme>
}
const DrawerCustom: React.FC<DrawerCustomProps> = ({ width, open, closeDrawer, variant, sx }) => {
  const theme = useTheme();
  const loc = useLocation()
  const sxPaper = () => {
    return sx ? sx["& .MuiDrawer-paper" as keyof SxProps<Theme>] : {}
  }

  return (
    <Drawer
      sx={{
        ...sx,
        width: width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          ...sxPaper(),
          // background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))",
          background: "linear-gradient(195deg, rgb(85 142 216), rgb(0 32 74))",
          color: "#FFFFFF",
          width: width - 12,
          // position: "inherit",
          // width: "inherit",
          boxSizing: 'border-box',
          transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          padding: "0px 8px",
          overflowX: "hidden"
        },
      }}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      variant={variant}
      anchor="left"
      open={open}
      onBackdropClick={() => closeDrawer()}
    >
      <DrawerHeader>
        {/*
        <IconButton onClick={() => closeDrawer()}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
        */}
        <ListItem>
          <ListItemIcon sx={{
            color: '#FFFFFF'
          }}>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
            primary="APPLICATION" />
        </ListItem>
      </DrawerHeader>
      {/*
      <Divider />
      */}
      <List
      >
        {optionsMenu.map((option, index) => {

          const {
            text,
            to,
            action
          } = option;
          const toLink = !!to ? to : loc.pathname;
          const functionAction = !!action ? action : function () { };
          const isActive = loc.pathname == to

          return (
            <LinkStyled
              sx={{
                color: "#FFFFFF"
              }}
              to={toLink}
              onClick={() => functionAction()} >
              <ListItem
                sx={{
                  width: "-webkit-fill-available",
                  minWidth: "fit-content",
                  borderRadius: "12px",
                  ...isActive && {
                    background: "#092c5a",
                  }
                }}
                button
                key={text}>
                <ListItemIcon sx={{
                  color: '#FFFFFF'
                }}>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                  primary={text} />
              </ListItem>
            </LinkStyled>
          )
        })}
      </List>
      {/*
      <Divider />
      */}
    </Drawer >
  )
}

export default DrawerCustom;
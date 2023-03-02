import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { useLocation } from 'react-router-dom';
import AuthStatus from '../../Pages/Auth/AuthStatus';
import { useApp, useAuth, useScrollPosition } from '../../Tools/Hooks';
import LinkStyled from '../LinkStyled';
import { BREADCRUMBS } from '../../Models/Breadcrumb';
import { Badge, Divider, Menu, MenuItem } from '@mui/material';
import NotificationItem from '../NotificationItem';
import NotificationModel from '../../Models/Notifications';
import { notificationConverter, NOTIFICATIONS_COLLECTION } from '../../Models/Notifications';
import { onSnapshot, query, collection, orderBy } from 'firebase/firestore';

const onTopTheme = createTheme({
  // palette: {
  //   mode: 'light',
  //   primary: {
  //     main: '#ffffff00',
  //   },
  // },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          width: "auto",
          top: 12,
          borderRadius: 12,
          padding: 4,
          margin: 12,
          zIndex: 1100,
          transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          // transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          boxShadow: "none",
          // boxShadow: "rgb(0 0 0 / 3%) 0rem 0.25rem 0.6875rem 0rem",
          backdropFilter: "none",
          color: "rgb(123, 128, 154)",
          backgroundColor: "transparent",
          // backgroundColor: "#ffffff26"
        }
      }
    }
  }
});


const scrollingTheme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          width: "auto",
          top: 12,
          borderRadius: 12,
          padding: 4,
          margin: 12,
          zIndex: 1100,
          transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          // transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          boxSizing: "border-box",
          boxShadow: "rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem",
          backdropFilter: "saturate(200%) blur(1.875rem)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          color: "rgb(52, 71, 103)",
        }
      }
    }
  }
});

interface AppBarStyledProps {
  setOpenDrawerMovile: Function,
  setOpenDrawerDesktop: Function,
  openDrawerDesktop: boolean
}
function AppBarStyled({ setOpenDrawerMovile, setOpenDrawerDesktop, openDrawerDesktop }: AppBarStyledProps) {
  const app = useApp()
  const auth = useAuth()
  const loc = useLocation()

  const [scrolling, setScrolling] = useState(false);
  const scrollTop = 60;
  const scrollPosition = useScrollPosition();

  useEffect(() => {
    setScrolling(scrollPosition > scrollTop)
    // console.log(scrolling, " ", scrollPosition)
  }, [scrollPosition]);



  const [notifications, setNotifications] = useState<NotificationModel[]>([]);
  const [visiblesNotifications, setVisiblesNotifications] = useState(5);
  const [unReaded, setUnReaded] = useState<number>(0);

  const [anchorElNoty, setAnchorElNoty] = useState<null | HTMLElement>(null);
  const openNoty = Boolean(anchorElNoty);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNoty(event.currentTarget)
  };
  const handleCloseNotifications = () => {
    setAnchorElNoty(null)
    setVisiblesNotifications(5)
  };



  useEffect(() => {
    // const q = query(collection(db, TURNS_COLLECTION), where("date", ">", "CA"));
    const unsubscribe = onSnapshot(query(
      collection(app.firestore, NOTIFICATIONS_COLLECTION),
      orderBy("date", "desc")
    ).withConverter(notificationConverter), (querySnapshot) => {
      let notificationsSnapshot: NotificationModel[] = [];

      // querySnapshot.docChanges().forEach(change => {
      //   let changed: NotificationModel = change.doc.data()
      //   console.log("Changed: ", changed)
      //   if (change.type === 'added' && !changed.seedForUsers.includes(auth.user!.uid)) {
      //     var title = changed.title;
      //     var icon = 'https://novo-estilo-app.web.app/logo192.png';
      //     var body = changed.description;
      //     var notification = new Notification(title, { body, icon });
      //   }
      //   // if (change.type === 'modified') {
      //   //   console.log('Modified city: ', change.doc.data());
      //   // }
      //   // if (change.type === 'removed') {
      //   //   console.log('Removed city: ', change.doc.data());
      //   // }
      // });

      querySnapshot.forEach((notification) => {
        notificationsSnapshot.push(notification.data());
      });
      setNotifications(notificationsSnapshot)
    });
  }, [])

  useEffect(() => {
    let _unReaded = notifications.filter(_notification => {
      return !_notification.seedForUsers.includes(auth.user!.uid)
    }).length
    setUnReaded(_unReaded)
  }, [notifications])

  return (
    <ThemeProvider theme={scrolling ? scrollingTheme : onTopTheme}>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <IconButton
            sx={{
              display: { xs: 'inline-flex', sm: 'none' },
            }}
            onClick={() => setOpenDrawerMovile(true)} edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <IconButton
            sx={{
              display: { xs: 'none', sm: 'inline-flex' },
              marginLeft: -2,
              marginRight: 2
            }}
            onClick={() => setOpenDrawerDesktop(!openDrawerDesktop)} edge="start" color="inherit" aria-label="menu">
            {openDrawerDesktop ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
          <div style={{ flexGrow: 1 }}>
            {loc.pathname != "/" &&
              <Breadcrumbs separator="›" aria-label="breadcrumb">
                <LinkStyled
                  sx={{ display: 'flex', alignItems: 'center' }}
                  color="inherit"
                  to="/"
                >
                  <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                </LinkStyled>
                {loc.pathname.split("/").filter(x => BREADCRUMBS[x]).map(_pathname =>
                  <LinkStyled
                    color="inherit"
                    to={`${loc.pathname.split(_pathname)[0]}${_pathname}`}
                  >
                    {BREADCRUMBS[_pathname]}
                  </LinkStyled>
                )}
              </Breadcrumbs>
            }

            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              {app.title}
            </Typography>
          </div>

          <IconButton
            onClick={handleClick}
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            id="NotificationIcon"
          >
            {unReaded > 0 ?
              <Badge badgeContent={unReaded} color="error">
                <NotificationsIcon />
              </Badge> :
              <NotificationsIcon color="disabled" />
            }
          </IconButton>
          <AuthStatus />
        </Toolbar>
      </AppBar>


      <Menu
        anchorEl={anchorElNoty}
        open={openNoty}
        className="BoxNotifications"
        onClose={handleCloseNotifications}
        PaperProps={{
          style: {
            padding: 0,
            maxHeight: "75%",
          },
        }}
        MenuListProps={{
          style: {
            padding: 0,
          },
        }}
      >
        {notifications.slice(0, visiblesNotifications).map((notification, indexN) => {
          return (
            <NotificationItem handleClick={handleCloseNotifications} notification={notification} />
          )
        })}
        {notifications.length === 0 ? (
          <MenuItem>No tienes notificaciones.</MenuItem>
        ) : notifications.length - 1 > visiblesNotifications ? (
          <MenuItem onClick={() => setVisiblesNotifications(p => p + 5)}>Mostrar mas ...</MenuItem>
        ) : (
          <MenuItem>Fin de la lista</MenuItem>
        )}
      </Menu>
    </ThemeProvider>
  );
}

export default AppBarStyled;
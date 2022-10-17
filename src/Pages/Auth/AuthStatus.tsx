import { Fragment, useState, MouseEvent } from "react";
import { Person, Settings, Logout } from "@mui/icons-material";
import { Box, Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useApp, useAuth } from '../../Tools/Hooks';
import LinkStyled from "../../Components/LinkStyled";

export default function AuthStatus() {
  let app = useApp();
  let auth = useAuth();
  // let navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!auth.profile) {
    return <LinkStyled to="/login">
      <IconButton
        size="small"
      >
        <Avatar
          src="https://www.gstatic.com/images/branding/product/1x/contacts_48dp.png"
        />
      </IconButton>
    </LinkStyled>
  }

  return (
    <Fragment>
      <Box sx={{
        marginLeft: "auto",
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar
              alt={`${auth.profile.displayName}`}
              src={auth.profile.photoURL ? auth.profile.photoURL : "https://www.gstatic.com/images/branding/product/1x/contacts_48dp.png"}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            // width: 320,
            maxWidth: '100%',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 20,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{
          padding: 3,
          textAlign: "center"
        }}
        >
          <Typography variant="subtitle2">Bienvenid@</Typography>
          <Typography variant="subtitle1"><b>{auth.profile.displayName}</b></Typography>
          <Typography variant="caption">{auth.profile.email}</Typography>
        </Box>

        <LinkStyled to="/account">
          <MenuItem>
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            Account
          </MenuItem>
        </LinkStyled>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => auth.signout()}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Fragment >
  );
}

import * as React from 'react';
import { Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Typography, Tooltip, ListItem } from '@material-ui/core';
import { PersonAdd, Settings, Logout, ExitToApp } from '@material-ui/icons';
import { CartContext } from '../CartContext/CartContext';
import ModeTheme2 from '../ModeTheme/ModeTheme2';
import Logout2 from '../Logout/Logout2'
import Cookies from "universal-cookie";

const cookies = new Cookies();
const user = cookies.get("user");  


export default function AccountMenu() {

  return (
          <>

              <ListItemIcon>
                <Avatar sx={{ width: 34, height: 34 }} />
              </ListItemIcon>
            {user}

    </>

  );
}

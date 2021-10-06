import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, Badge } from '@material-ui/core'
import { Menu, ShoppingCart } from '@material-ui/icons';
import BrandIcon from '../BrandIcon/BrandIcon';
import './NavBar.css';

export default function NavBar({carrito}) {
return (
<Box sx={{ flexGrow: 1 }}>
  <AppBar position="static">
    <Toolbar className="toolBar">
      <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <Menu />
      </IconButton>
      <div className="logo">
        <BrandIcon />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Tecnalink
        </Typography>
      </div>
      <Badge badgeContent={carrito} color="error">
      <ShoppingCart />
      </Badge>
    </Toolbar>
  </AppBar>
</Box>
);
}
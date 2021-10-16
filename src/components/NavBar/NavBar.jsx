import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, Badge } from '@material-ui/core'
import { Menu, ShoppingCart } from '@material-ui/icons';
import BrandIcon from '../BrandIcon/BrandIcon';
import './NavBar.css';
import { Link } from 'react-router-dom';

export default function NavBar({carrito}) {
  const categorias={
		laptops:"abcat0502000",
		phones:"pcmcat209400050001",
		tv:"abcat0101000"
	}
return (
<Box sx={{ flexGrow: 1 }}>
  <AppBar position="fixed">
    <Toolbar className="toolBar">
      <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <Menu />
      </IconButton>
      <div className="logo">
        <BrandIcon />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Tecnalink
        </Typography> 
        <Link underline="none" to={`/category/${categorias.phones}`}>
{console.log(categorias.phones)}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Phones
        </Typography>
        </Link>

      </div>
      <Badge badgeContent={carrito} color="error">
      <ShoppingCart />
      </Badge>
    </Toolbar>
  </AppBar>
</Box>
);
}
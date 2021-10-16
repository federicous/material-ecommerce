import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, Badge, Button } from '@material-ui/core'
import { Menu, ShoppingCart } from '@material-ui/icons';
import BrandIcon from '../BrandIcon/BrandIcon';
import './NavBar.css';
import { Link } from 'react-router-dom';

export default function NavBar({carrito}) {

  const navList =[
    {id:"1", name:"Laptops", value:"abcat0502000"},
    {id:"2", name:"Phones", value:"pcmcat209400050001"},
    {id:"3", name:"TVs", value:"abcat0101000"},
  ]
return (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="fixed">
      <Toolbar className="toolBar">
        {/* <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <Menu />
        </IconButton> */}
        <div className="logo">
          <BrandIcon />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginRight:"2rem" }}>
            Tecnalink
          </Typography>
          {navList.map((item) => (
            <Link key={item.id} to={`/category/${item.value}`}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Button sx={{ color: "white" }} variant="text">
                  {item.name}
                </Button>
              </Typography>
            </Link>
          ))}
        </div>
        <Badge badgeContent={carrito} color="error">
          <ShoppingCart />
        </Badge>
      </Toolbar>
    </AppBar>
  </Box>
);
}
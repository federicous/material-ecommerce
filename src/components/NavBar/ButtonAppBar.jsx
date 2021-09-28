import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import BrandIcon from '../BrandIcon/BrandIcon';
import './ButtonAppBar.css';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="toolBar">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <div className="logo">
          <BrandIcon/> 
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           Tecnalink
          </Typography>
          </div>
          {/* <Button color="inherit">Login</Button> */}
          <ShoppingCart/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

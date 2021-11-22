import React, {useContext, useState, useEffect} from 'react'
import { AppBar, Box, Toolbar, Typography, IconButton, Badge, Button, useMediaQuery, Drawer, ListItem, ListItemText, List } from '@material-ui/core'
import { Menu, ShoppingCart } from '@material-ui/icons';
import BrandIcon from '../BrandIcon/BrandIcon';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext/CartContext';
import { navList } from '../utils/navList';
import { useTheme } from '@emotion/react';
import TemporaryDrawer from './TemporaryDrawer';

export default function NavBar() {
	const cartContext = useContext(CartContext);
	const {cart}= cartContext;

  const [quantity, setQuantity] = useState(0)
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.up("md"));
  const isMobile = useMediaQuery('(max-width:900px)');

  useEffect(() => {
    let total=0;
    for (const prod of cart) {
      total+=prod.qty
    }
    setQuantity(total)
  }, [cart])


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
        <Link
            style={{textDecoration: "none", color: "inherit", display: "flex", flexDirection: "row", alignItems: "center",}}
            to={`/`}
          >
            <BrandIcon />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginRight: "2rem" }}>
              Tecnalink
            </Typography>
          </Link>

        {isMobile ? (
          <></>
        ):(
          navList.map((item) => (
            <Link key={item.id} to={`/category/${item.value}`}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Button sx={{ color: "white" }} variant="text">
                  {item.name}
                </Button>
              </Typography>
            </Link>
          ))
        )}

        </div>
        <div>
          {isMobile ? (
            <Box style={{textDecoration: "none", color: "inherit", display: "flex", flexDirection: "row", alignItems: "center",}}  >
        <Link to={`/cart`} style={{ textDecoration: "none", color: "inherit" }}>
        <Badge badgeContent={quantity} color="error">
          <ShoppingCart />
        </Badge>
      </Link>
      <TemporaryDrawer/>
      </Box>
          ):(
            <Link to={`/cart`} style={{ textDecoration: "none", color: "inherit" }}>
            <Badge badgeContent={quantity} color="error">
              <ShoppingCart />
            </Badge>
          </Link>
          )}
        {/* <Link to={`/cart`} style={{ textDecoration: "none", color: "inherit" }}>
          <Badge badgeContent={quantity} color="error">
            <ShoppingCart />
          </Badge>
        </Link>
         */}
        </div>

      </Toolbar>
    </AppBar>
  </Box>
);
}
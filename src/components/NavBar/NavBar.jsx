import React, {useContext, useState, useEffect} from 'react'
import { AppBar, Box, Toolbar, Typography,  Badge, Button, useMediaQuery, } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons';
import BrandIcon from '../BrandIcon/BrandIcon';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext/CartContext';
import { navList } from '../utils/navList';
import TemporaryDrawer from './TemporaryDrawer';
import Logout from '../Logout/Logout';
import Category from '../Category/Category'
import Category2 from '../Category/Category2'
import { grey } from '@material-ui/core/colors';
import Busqueda from '../Busqueda/Busqueda'
import ModeTheme from '../ModeTheme/ModeTheme';
import Account from '../Account/Account'
import Cookies from "universal-cookie";

const cookies = new Cookies();
const usuarioCookie = cookies.get("user");  


export default function NavBar() {
	const cartContext = useContext(CartContext);
	const {cart, user}= cartContext;
  const [quantity, setQuantity] = useState(0)
  const isMobile = useMediaQuery('(max-width:900px)');
  const [usuario, setUsuario] = useState("")

  useEffect(() => {
    let total=0;
    for (const prod of cart) {
      total+=prod.qty
    }
    setQuantity(total)
  }, [cart])

  useEffect(() => {
    setUsuario(usuarioCookie)
    console.log("navbar log useeffect");
  }, [user,cart])
  

return (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="fixed" color='primary' enableColorOnDark>
      <Toolbar className="toolBar">

        <div className="logo">
          <Link style={{textDecoration: "none", color: "inherit", display: "flex", flexDirection: "row", alignItems: "center",}}
              to={`/home`}
            >
              <BrandIcon />
              {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginRight: "2rem" }}>
                Tecnalink
              </Typography> */}
          </Link>

          {isMobile ? (
            <></>
          ):(
            <>
            {usuario ? <Category2/> : <></>}
            {/* <Category2/> */}
            <Busqueda/>
            {/* <ModeTheme/>
            <Logout /> */}
            </>
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
                  <>
                  {usuario ? 
                                     <Box style={{textDecoration: "none", color: "inherit", display: "flex", flexDirection: "row", alignItems: "center",}}>
                                     <Link to={`/cart`} style={{ textDecoration: "none", color: "inherit" }}>
                                       <Badge badgeContent={quantity} color="error">
                                         <ShoppingCart />
                                       </Badge>
                                     </Link>
                                     <Account/>
                                   </Box>
                  
                  : <></>}
                    {/* <Box style={{textDecoration: "none", color: "inherit", display: "flex", flexDirection: "row", alignItems: "center",}}>
                      <Link to={`/cart`} style={{ textDecoration: "none", color: "inherit" }}>
                        <Badge badgeContent={quantity} color="error">
                          <ShoppingCart />
                        </Badge>
                      </Link>
                      <Account/>
                    </Box> */}

                  </>
                )}
        </div>
      </Toolbar>
    </AppBar>
  </Box>
);
}
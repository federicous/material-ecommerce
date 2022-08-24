import React, {useContext, useState, useEffect} from 'react'
import { AppBar, Box, Toolbar, Badge, useMediaQuery, IconButton } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons';
import BrandIcon from '../BrandIcon/BrandIcon';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext/CartContext';
import TemporaryDrawer from './TemporaryDrawer';
import Category2 from '../Category/Category2'
import CategoryTekbond from '../Category/CategoryTekbond'
import Busqueda from '../Busqueda/Busqueda'
import Account from '../Account/Account'
import Cookies from "universal-cookie";
import {config} from "../../config/config";
import axios from "axios";

const cookies = new Cookies();
const usuarioCookie = cookies.get("user");  
const token = cookies.get("token");  

export default function NavBar() {
	const cartContext = useContext(CartContext);
	const {cart, user}= cartContext;
  const [quantity, setQuantity] = useState(0)
  const isMobile = useMediaQuery('(max-width:900px)');
  const [usuario, setUsuario] = useState("")
  const [navList, setNavList] = React.useState([])

  useEffect(() => {
    let total=0;
    for (const prod of cart) {
      total+=prod.qty
    }
    setQuantity(total)
  }, [cart])

  useEffect(() => {
    setUsuario(usuarioCookie)
  }, [user,cart])
  
  React.useEffect(() => {
    let cancel = false;
    if (cookies.get("user")) {
      const configuration = {
        method: "get",
        // url: `${config.SERVER}/api/categorias/label`,
        url: `${config.SERVER}/api/categorias/lista`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };
  
            // make the API call
        axios(configuration)
        .then((result) => {
          if (cancel) return;
          setNavList([...result.data])
        })
        .catch((error) => {
          error = new Error();
        })
        return () => { 
          cancel = true;
        }
    }

  }, [user]);

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
            {usuario ? <>             
              {/* <Category2 lista="bremen"/> <CategoryTekbond/>  */}
              {navList.map((item) => (
                <Category2 key={item} lista={item}/>
                        ))}            
            </> : <></>}
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
                                        <IconButton>
                                          <Badge badgeContent={quantity} color="error">
                                            <ShoppingCart />
                                          </Badge>
                                        </IconButton>
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
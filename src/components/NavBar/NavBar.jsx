import React, {useContext, useState, useEffect} from 'react'
import { AppBar, Box, Toolbar, Badge, useMediaQuery, IconButton } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons';
import BrandIcon from '../BrandIcon/BrandIcon';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext/CartContext';
import TemporaryDrawer from './TemporaryDrawer';
import Busqueda from '../Busqueda/Busqueda'
import Account from '../Account/Account'
import Cookies from "universal-cookie";
// import ApiQuery from "../utils/apiQuery/apiQuery"
// let apiQuery = new ApiQuery();

const cookies = new Cookies();
const usuarioCookie = cookies.get("user");  

export default function NavBar() {
	const cartContext = useContext(CartContext);
	const {cart, user}= cartContext;
  const [quantity, setQuantity] = useState(0)
  const isMobile = useMediaQuery('(max-width:900px)');
  const [usuario, setUsuario] = useState("")
  // const [navList, setNavList] = React.useState([])
  // const [isAdmin, setIsAdmin] = useState(false)

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
  
  // useEffect(() => {
  //   apiQuery.get(`/permisos`)
  //   .then((respuesta)=>{
  //     console.log(respuesta);
  //     setIsAdmin(respuesta)
  //   })
  // }, [])

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
              {/* {navList.map((item) => (
                <Category2 key={item} lista={item}/>
                        ))}             */}
            </> : <></>}
            {/* <Category2/> */}
            {/* <Busqueda/> */}
            {/* <ModeTheme/>
            <Logout /> */}
            </>
          )}

        </div>
        <div>
          {isMobile ? (
            <Box style={{textDecoration: "none", color: "inherit", display: "flex", flexDirection: "row", alignItems: "center",}}  >
              <Link to={`/cart`} style={{ textDecoration: "none", color: "inherit" }}>
                <IconButton>
                  <Badge badgeContent={quantity} color="error">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </Link>
              <TemporaryDrawer/>
            </Box>
                ):(
                  <>
                  {usuario ? 
                  <>
                                     <Box style={{textDecoration: "none", color: "inherit", display: "flex", flexDirection: "row", alignItems: "center",}}>
                                     <Busqueda/>
                                      {/* <OrderButton/> */}
                                     <Link to={`/cart`} style={{ textDecoration: "none", color: "inherit" }}>
                                        <IconButton>
                                          <Badge badgeContent={quantity} color="error">
                                            <ShoppingCart />
                                          </Badge>
                                        </IconButton>
                                     </Link>
                                     <Account/>
              {/* <PermanentDrawer/> */}
                                   </Box>
                  </>
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
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  SwipeableDrawer,
} from "@material-ui/core";
import { Menu, Search, } from "@material-ui/icons";
import { Box } from "@material-ui/system";
import * as React from "react";
import { Link } from "react-router-dom";
// import { navList } from "../utils/navList";
import LogoutDrawer from "../Logout/LogoutDrawer";
import ModeThemeDrawer from "../ModeTheme/ModeThemeDrawer";
import AccountDrawer from '../Account/AccountDrawer'
import axios from "axios";
// import {config} from "../../config/config";
import {config} from "../../config/config";
import { CartContext } from '../CartContext/CartContext';
import CategoryCollapse from "../Category/CategoryCollapse";
import Cookies from "universal-cookie";
import OrderButtonTemporary from "../Order/OrderButtonTemporary";
import DownloadsButton from "../Downloads/DownloadsButton"
import Ofertas from "../Ofertas/Ofertas"
import Novedades from "../Novedades/Novedades"

const cookies = new Cookies();
const token = cookies.get("token");  

export default function TemporaryDrawer() {
  const [navList, setNavList] = React.useState([])
  const cartContext = React.useContext(CartContext);
	const {user}= cartContext;

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
          setNavList([...result.data].filter(Boolean))
        })
        .catch((error) => {
          error = new Error();
        })
        return () => { 
          cancel = true;
        }
    }

  }, [user]);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  let anchor = "left";

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ height:"100%" , width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <List sx={{height:"100%", pb:"0px"}}>
        <Box sx={{height:"100%", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
          <Box>
            <ListItem
              onClick={toggleDrawer(anchor, false)}
              onKeyDown={toggleDrawer(anchor, false)}
            >
              <AccountDrawer/>
            </ListItem>
            <Divider />
            <Link to={`/searchDrawer/`} style={{ textDecoration:"none"}}>
              <ListItem button 
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
              >
                  <ListItemIcon sx={{color:"text.primary"}}>
                  <Search sx={{mr:1}}/> Busqueda
                  </ListItemIcon>           
              </ListItem>
              <Divider />
            </Link>

            {navList.map((item) => (        
                <CategoryCollapse key={item} lista={item} toggleDrawer={toggleDrawer} anchor={anchor} />
            ))}
           <Divider />  
           <Ofertas toggleDrawer={(anchor, isfalse) => toggleDrawer(anchor, isfalse)} anchor={anchor}/>
           <Divider />   
           <Novedades toggleDrawer={(anchor, isfalse) => toggleDrawer(anchor, isfalse)} anchor={anchor}/>
           <Divider />  
          </Box>
          <Box>
          <Divider />
          <DownloadsButton toggleDrawer={(anchor, isfalse) => toggleDrawer(anchor, isfalse)} anchor={anchor}/>
          <Divider />
          <OrderButtonTemporary toggleDrawer={(anchor, isfalse) => toggleDrawer(anchor, isfalse)} anchor={anchor}
          />
            <Divider />
            <ModeThemeDrawer
              onClick={toggleDrawer(anchor, false)}
              onKeyDown={toggleDrawer(anchor, false)}
            />
            <Divider />
            <LogoutDrawer
              onClick={toggleDrawer(anchor, false)}
              onKeyDown={toggleDrawer(anchor, false)}
            />
          </Box>
        </Box>
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={anchor}>
        <Button
          sx={{ color: "white" }}
          onClick={toggleDrawer(anchor, true)}
          size="large"
        >
          <Menu fontSize="large" />
        </Button>
        <SwipeableDrawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
          onOpen={toggleDrawer(anchor, true)}
        >
          {list(anchor)}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}

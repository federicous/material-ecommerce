import {
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  SwipeableDrawer,
} from "@material-ui/core";
import { Menu, ExitToApp, Search } from "@material-ui/icons";
import { Box } from "@material-ui/system";
import * as React from "react";
import { Link } from "react-router-dom";
// import { navList } from "../utils/navList";
import LogoutDrawer from "../Logout/LogoutDrawer";
import ModeThemeDrawer from "../ModeTheme/ModeThemeDrawer";
import AccountDrawer from '../Account/AccountDrawer'
import axios from "axios";
import { CartContext } from '../CartContext/CartContext';
import Cookies from "universal-cookie";

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
        url: `/api/categorias/label`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
        <AccountDrawer/>
        </ListItem>
        <Link to={`/searchDrawer/`} style={{ textDecoration:"none"}}>
        <ListItem>
            <ListItemIcon>
            <Search sx={{mr:1}}/> Busqueda
            </ListItemIcon>           
        </ListItem>
        </Link>
          {navList.map((item) => (
            <ListItem key={item} sx={{color:'text.primary'}}
            component={Link}   to={`/category/${item}`} style={{ textDecoration:"none"}}
            >
              {item}
            </ListItem>
          ))}
        <Divider />
        <ModeThemeDrawer/>
        <Divider />
        <LogoutDrawer/>
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

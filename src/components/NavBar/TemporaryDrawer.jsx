import {
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Typography,
} from "@material-ui/core";
import { Menu, ExitToApp} from "@material-ui/icons";
import { Box } from "@material-ui/system";
import * as React from "react";
import { Link } from "react-router-dom";
// import { navList } from "../utils/navList";
import LogoutDrawer from "../Logout/LogoutDrawer";
import ModeTheme from "../ModeTheme/ModeTheme";
import Account from '../Account/Account'
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
    if (cookies.get("user")) {
      console.log("user dio true");
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
          console.log(result.data);
          setNavList([...result.data])
        })
        .catch((error) => {
          error = new Error();
        })
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
      <Account/>
      </ListItem>
        {navList.map((item) => (
          // <ListItem key={item}>
          //   <Link to={`/category/${item}`} style={{ textDecoration:"none", color:"inherit"}}>
          //       <Button sx={{ color: "text.primary" }} variant="text">
          //       <Typography variant="compliant" component="div" sx={{ flexGrow: 1,textAlign:"left" }}>
          //         {item}
          //         </Typography>
          //       </Button>
          //   </Link>

            <ListItem key={item} sx={{color:'text.primary'}}
            
            component={Link}   to={`/category/${item}`} style={{ textDecoration:"none"}}
            >
            {/* <Link to={`/category/${item}`} style={{ textDecoration:"none", color:"inherit"}}> */}
                {/* <Button sx={{ color: "text.primary" }} variant="text"> */}
                {/* <Typography variant="compliant" component="div" sx={{ flexGrow: 1,textAlign:"left" }}> */}
                  {item}
                  {/* </Typography> */}
                {/* </Button> */}
            {/* </Link> */}




          </ListItem>
        ))}
        <Divider />
        <ModeTheme/>
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
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          {list(anchor)}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

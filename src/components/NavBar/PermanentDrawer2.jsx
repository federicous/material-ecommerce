import * as React from 'react';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemButton from '@material-ui/core/ListItemButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import LogoutDrawer from "../Logout/LogoutDrawer";
import ModeThemeDrawer from "../ModeTheme/ModeThemeDrawer";
import AccountDrawer from '../Account/AccountDrawer'
import { Link } from "react-router-dom";
import CategoryCollapse from "../Category/CategoryCollapse";
import { Menu, Search, } from "@material-ui/icons";
import axios from "axios";
import Cookies from "universal-cookie";
import { CartContext } from '../CartContext/CartContext';
import {config} from "../../config/config";

const cookies = new Cookies();

const token = cookies.get("token");  
const drawerWidth = 250;

export default function PermanentDrawerLeft() {
	const [navList, setNavList] = React.useState([])
	const cartContext = React.useContext(CartContext);
	const {user}= cartContext;

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
    <Box sx={{ display: 'flex', zIndex:"1" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        {/* <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar> */}
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* <Toolbar />
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}

<Box
      sx={{ height:"100%", marginTop:"70px"}}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <List sx={{height:"100%", py:"0px"}}>
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
              <ListItem
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
          </Box>
          <Box>
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

      </Drawer>
      {/* <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box> */}
    </Box>
  );
}

import {
	Button,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Collapse,
	Typography,
	SwipeableDrawer,
      } from "@material-ui/core";
      import { Menu, ExitToApp, Search, Inbox,ExpandLess, ExpandMore, StarBorder  } from "@material-ui/icons";
      import { Box } from "@material-ui/system";
      import * as React from "react";
      import { Link } from "react-router-dom";
      // import { navList } from "../utils/navList";
      import LogoutDrawer from "../Logout/LogoutDrawer";
      import ModeThemeDrawer from "../ModeTheme/ModeThemeDrawer";
      import AccountDrawer from '../Account/AccountDrawer'
      import axios from "axios";
      import {config} from "../../config/config";
      import { CartContext } from '../CartContext/CartContext';
      import Cookies from "universal-cookie";
      
      const cookies = new Cookies();
      const token = cookies.get("token");  
      
      function capitalizeFirstLetter(string) {
	let cadena = string.toLowerCase()
	return cadena.charAt(0).toUpperCase() + cadena.slice(1);
      }

      function capitalizeAllLetter(string) {
	let cadena = string.toUpperCase()
	return cadena;
      }

      export default function CategoryCollapse({lista, toggleDrawer, anchor}) {
	const [navList, setNavList] = React.useState([])
	const cartContext = React.useContext(CartContext);
	const {user}= cartContext;
	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		setOpen(!open);
	      };

	      React.useEffect(() => {
		let cancel = false;
		if (cookies.get("user")) {
		  const configuration = {
		    method: "get",
		    // url: `${config.SERVER}/api/categorias/label`,
		    url: `${config.SERVER}/api/categorias/${lista}/label`,
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
<>
	<ListItem button onClick={handleClick}>
		<ListItemText primary={capitalizeAllLetter(lista)} />
		{open ? <ExpandLess /> : <ExpandMore />}
	</ListItem>
	<Collapse in={open} timeout="auto" unmountOnExit>
		<List component="div" disablePadding
		onClick={toggleDrawer(anchor, false)}
		onKeyDown={toggleDrawer(anchor, false)}
		>
			{navList.map((item) => (
				<ListItem key={item} sx={{color:'text.primary', ml:2}}
				component={Link}  to={`/${lista}/category/${item}`} style={{ textDecoration:"none"}}
				onClick={toggleDrawer(anchor, false)}
				onKeyDown={toggleDrawer(anchor, false)}
				>
					{capitalizeFirstLetter(item)}
				</ListItem>
			))}
		</List>
	</Collapse>
</>
)
  }
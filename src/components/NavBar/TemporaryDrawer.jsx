import {
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { Box } from "@material-ui/system";
import * as React from "react";
import { Link } from "react-router-dom";
import { navList } from "../utils/navList";
import Logout from "../Logout/Logout";

export default function TemporaryDrawer() {
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
        {navList.map((item) => (
          <ListItem key={item}>
            <Link to={`/category/${item}`} style={{ textDecoration:"none", color:"inherit"}}>
                <Button sx={{ color: "black" }} variant="text">
                <Typography variant="compliant" component="div" sx={{ flexGrow: 1,textAlign:"left" }}>
                  {item}
                  </Typography>
                </Button>
            </Link>
          </ListItem>
        ))}


        <Divider />
        <ListItem>
          <Logout />
        </ListItem>
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

import { Button, Divider, Drawer, List, ListItem, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { Box } from '@material-ui/system';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { navList } from '../utils/navList';


export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  let anchor="left";

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

      <List>
        {navList.map((item) => (
          <ListItem>
                      <Link key={item.id} to={`/category/${item.value}`}>
                      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Button sx={{ color: "black" }} variant="text">
                          {item.name}
                        </Button>
                      </Typography>
                    </Link>
          </ListItem>
        ))}
        <Divider />
      </List>
    </Box>
  );

  return (
    <div>
        <React.Fragment key={anchor}>
          <Button sx={{ color: "white" }} onClick={toggleDrawer(anchor, true)} size="large">
            <Menu fontSize='large'/>
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
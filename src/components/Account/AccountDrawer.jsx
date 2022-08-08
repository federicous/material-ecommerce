import * as React from 'react';
import { Avatar, ListItemIcon } from '@material-ui/core';
import Cookies from "universal-cookie";

const cookies = new Cookies();
const user = cookies.get("user");  

export default function AccountMenu() {

  return (
          <>

              <ListItemIcon>
                <Avatar sx={{ width: 34, height: 34 }} />
              </ListItemIcon>
            {user}

    </>

  );
}

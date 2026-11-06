import { closeSharedSession } from "../sharedSession";
import { MenuItem, ListItemIcon } from "@material-ui/core";
import { ExitToApp } from '@material-ui/icons';
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function AuthComponent() {

  // logout
  const logout = async () => {
    try { await closeSharedSession(); } catch(error) { window.alert(error.message); return; }
    // destroy the cookie


    // redirect user to the landing page
    window.location.href = "/";
  };

  return (
    <>
      <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
          Salir
        </MenuItem>
    </>
  );
}

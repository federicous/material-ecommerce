import { closeSharedSession } from "../sharedSession";
import { MenuItem, ListItemIcon, ListItem } from "@material-ui/core";
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
            <ListItem button  onClick={() => logout()} sx={{display:"flex", justifyContent:"center", cursor:"pointer"}}>
              <ListItemIcon sx={{alignItems:"center", color:"text.primary"}}>
                <ExitToApp sx={{mr:1}} fontSize="small" />Salir
              </ListItemIcon>
            </ListItem>
    </>
  );
}

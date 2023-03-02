import { ListItem, ListItemIcon} from "@material-ui/core";
import { Link } from 'react-router-dom';
import { GetApp } from '@material-ui/icons';

export default function OrderButton({toggleDrawer, anchor}) {
  return (
    <>
	<Link to={`/downloads`} style={{ textDecoration: "none", color: "inherit" }}>
		<ListItem button  sx={{display:"flex", justifyContent:"center"}}
		           onClick={toggleDrawer(anchor, false)}
			   onKeyDown={toggleDrawer(anchor, false)}
		>
			<ListItemIcon sx={{mr:1, alignItems:"center", color:"text.primary"}}>
			<GetApp  sx={{mr:1}} fontSize="small"/>Descargar listas
			</ListItemIcon>
		</ListItem>

	</Link>

    </>
  );
}
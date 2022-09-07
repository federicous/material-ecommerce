import { MenuItem, IconButton, Button} from "@material-ui/core";
import { ExitToApp } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { History } from '@material-ui/icons';

export default function OrderButton() {

  return (
    <>
	<Link to={`/order`} style={{ textDecoration: "none", color: "inherit" }}>
		<Button variant="filled" startIcon={<History />}>
		  Ordenes
		</Button>
	</Link>

    </>
  );
}
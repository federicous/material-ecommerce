import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ApiQuery from '../utils/apiQuery/apiQuery';
import OrderTable from '../OrderTable/OrderTable';

export default function Order() {
  const [isAdmin, setIsAdmin] = React.useState(false);
  React.useEffect(() => {
    let mounted = true;
    new ApiQuery().get('/permisos/nivel').then(result => { if (mounted) setIsAdmin(result === true); });
    return () => { mounted = false; };
  }, []);
 
  return (
    <>
    <Typography variant={"h5"}>Ordenes</Typography>
    {isAdmin && <Button component={Link} to="/notifications">Notificaciones pendientes</Button>}
        <Box
        sx={{fontSize: 20, display: "flex", flexDirection:"column", justifyContent: "space-between", alignItems: "center", margin: "0px", flexWrap:'wrap', width:"100%", mt:3}} >
          <OrderTable />
        </Box>
    </>
  );
}
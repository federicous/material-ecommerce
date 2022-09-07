import {Box, Typography } from '@material-ui/core';
import OrderTable from '../OrderTable/OrderTable';

export default function Order() {
 
  return (
    <>
    <Typography variant={"h5"}>Ordenes</Typography>
        <Box
        sx={{fontSize: 20, display: "flex", flexDirection:"column", justifyContent: "space-between", alignItems: "center", margin: "0px", flexWrap:'wrap', width:"100%", mt:3}} >
          <OrderTable />
        </Box>
    </>
  );
}
import React, {useContext } from 'react'
import {Box, Typography, Button } from '@material-ui/core';
import { CartContext } from '../CartContext/CartContext';
import CartTable from '../CartTable.jsx/CartTable';
import { Link } from 'react-router-dom';
// import Return from '../utils/Return';


export default function Cart() {

	const cartContext = useContext(CartContext);
	const {cart, total, removeFromCart, cleanCart, ivaTotal}= cartContext;  
 
  return (
    <>
    <Typography variant={"h5"}>Carrito</Typography>
      {total ? (
        <Box
        // sx={{fontSize: 20, display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: "center", margin: "0px", flexWrap:'wrap', width:"100%"}} >
        sx={{fontSize: 20, display: "flex", flexDirection:"column", justifyContent: "space-between", alignItems: "center", margin: "0px", flexWrap:'wrap', width:"100%"}} >
          <CartTable cart={cart} removeFromCart={removeFromCart} total={total} ivaTotal={ivaTotal} cleanCart={cleanCart}/>
        </Box>

      ) : (
        <Box sx={{fontSize: 12, display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", margin: "50px",}} >
          <Typography sx={{fontSize: 20, display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", margin: "10px",}} >
            Carrito vacío !!!
          </Typography>
          <Link to={`/`} style={{ textDecoration:"none", color:"inherit"}}>
			    	<Button size="small" variant="contained" color="primary"  sx={{ fontSize: 12, width:"100%",  }}
			    	>Volver</Button>
			    </Link>	
            
        </Box>
      )}
    </>
  );
}
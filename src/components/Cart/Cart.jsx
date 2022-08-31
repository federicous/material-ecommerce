import React, {useContext, useState, useEffect } from 'react'
import {Box, Modal, Typography, useMediaQuery, Button } from '@material-ui/core';
import { CartContext } from '../CartContext/CartContext';
import CartTable from '../CartTable.jsx/CartTable';
import Form2 from '../Form/Form2';
import { Link } from 'react-router-dom';
import axios from "axios";
import {config} from "../../config/config";
// import Return from '../utils/Return';
import Cookies from "universal-cookie";
const cookies = new Cookies();

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
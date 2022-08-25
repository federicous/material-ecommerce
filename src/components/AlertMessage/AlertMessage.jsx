import * as React from 'react';
import {Box, Modal, Typography, useMediaQuery, Button, Alert, AlertTitle  } from '@material-ui/core';
import { CartContext } from '../CartContext/CartContext';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

export default function AlertMessage() {

	const {message} = useParams()
	const cartContext = React.useContext(CartContext);
	const {cart, total, removeFromCart, cleanCart, ivaTotal}= cartContext;  

  React.useEffect(() => {
    cleanCart()
  }, [])
  

  return (
    <>
      <Alert severity="success" sx={{my:3}}>
        <AlertTitle>Enviado</AlertTitle>
        La orden fue generada — <strong>ID: {message}</strong>
      </Alert>
      <Link to={`/`} style={{ textDecoration:"none", color:"inherit"}}>
			    	<Button size="small" variant="contained" color="primary"  sx={{ fontSize: 12, width:"100%",  }}
			    	>Volver</Button>
			</Link>	
    </>
  );
}
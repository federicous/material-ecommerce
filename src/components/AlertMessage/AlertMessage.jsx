import * as React from 'react';
import { Button, Alert, AlertTitle } from '@material-ui/core';
import { CartContext } from '../CartContext/CartContext';
import { useParams } from 'react-router';
import { Link, useLocation } from 'react-router-dom';

export default function AlertMessage() {

	const {message} = useParams()
  const {state} = useLocation();
	const cartContext = React.useContext(CartContext);
	const {clearLocalCart}= cartContext;

  React.useEffect(() => {
    if (!state?.cleanupPending) clearLocalCart()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <>
      <Alert severity="success" sx={{my:3}}>
        <AlertTitle>Pedido registrado</AlertTitle>
        La orden fue generada — <strong>ID: {message}</strong>.
        {state?.notificationStatus === 'pending' || state?.notificationStatus === 'sending' ? ' La confirmación por correo está pendiente de envío.' : state?.notificationStatus === 'review' ? ' El correo requiere revisión; contactá a tu vendedor.' : state?.notificationStatus === 'accepted' ? ' El proveedor de correo aceptó la notificación.' : ' La confirmación por correo puede demorar.'}
      </Alert>
      {state?.cleanupPending && <Alert severity="warning">El carrito pudo haber cambiado durante el envío. Revisalo antes de crear otro pedido.</Alert>}
      <Link to={`/`} style={{ textDecoration:"none", color:"inherit"}}>
			    	<Button size="small" variant="contained" color="primary"  sx={{ fontSize: 12, width:"100%",  }}
			    	>Volver</Button>
			</Link>
    </>
  );
}
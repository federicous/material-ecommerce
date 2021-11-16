import React, {useContext, useEffect } from 'react'
import {Box, Button, Typography  } from '@material-ui/core';
import { CartContext } from '../CartContext/CartContext';
import { Link } from 'react-router-dom';
import { getFirestore } from '../../services/getFirebase';
import firebase from 'firebase/app'
import 'firebase/firestore'
import CartTable from '../CartTable.jsx/CartTable';
import Form2 from '../Form/Form2';
import { datosJson, datosJsonPhones, datosJsonTv } from '../utils/datosJson';

const TAX_RATE = 0.105;

export default function Cart() {

	const cartContext = useContext(CartContext);
	const {cart, total, removeFromCart}= cartContext;  

    let order = {};
    const orderGenerate = () => {
      console.log(cart);
      order.date = firebase.firestore.Timestamp.fromDate(new Date());
      order.buyer = {
        name: "John",
        phone: "341654321",
        email: "john@react.com",
      };
      order.total = total;
      order.items = cart.map((cartItem) => {
        const id = cartItem.sku;
        const nombre = cartItem.modelNumber;
        const precio = cartItem.regularPrice * cartItem.qty;

        return { id, nombre, precio };
      });
      console.log(order);

      const db = getFirestore();
      const orderQuery = db.collection("orders");
      orderQuery
        .add(order)
        .then((result) => console.log(result))
        .catch((error) => console.log(error));
    };

    let productos={};
    const datosGenerate = () => {
      console.log(cart);
      datosJsonPhones.products.map((cartItem) => {
        productos.sku = cartItem.sku;
        productos.modelNumber = cartItem.modelNumber;
        productos.regularPrice = cartItem.regularPrice;
        productos.name = cartItem.name;
        productos.quantityLimit = cartItem.quantityLimit;
        productos.manufacturer = cartItem.manufacturer;
        productos.image = cartItem.image
        productos.categoryId = "phones";
        
        const db = getFirestore();
        const orderQuery = db.collection("Items");
        orderQuery
          .add(productos)
          .then((result) => console.log(result))
          .catch((error) => console.log(error));
        return {productos}
      });
    };

    useEffect(() => {
      console.log(cart);
      console.log(total);
    }, [cart,total])  
    
  return (
    <>
      {total ? (
        <Box
        sx={{
          fontSize: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0px",
          flexWrap:'wrap'
        }}
        >
          <CartTable
          cart={cart}
          removeFromCart={removeFromCart}
          total={total}
          TAX_RATE={TAX_RATE}          
          />
          <Form2
           orderGenerate={orderGenerate}
          />
        </Box>

      ) : (
        <Box
          sx={{
            fontSize: 12,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            margin: "50px",
          }}
        >
          <Typography
            sx={{
              fontSize: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
              margin: "10px",
            }}
          >
            Empty Cart !!!
          </Typography>
          <Link
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            to={`/`}
          >
            <Button size="small" variant="contained" color="primary" onClick={()=>datosGenerate()}>
              return
            </Button>
          </Link>
        </Box>
      )}
    </>
  );
}
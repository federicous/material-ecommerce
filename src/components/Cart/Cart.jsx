import React, {useContext, useEffect, useState } from 'react'
import {Box, Button, Modal, Typography  } from '@material-ui/core';
import { CartContext } from '../CartContext/CartContext';
import { Link } from 'react-router-dom';
import { getFirestore } from '../../services/getFirebase';
import firebase from 'firebase/app'
import 'firebase/firestore'
import CartTable from '../CartTable.jsx/CartTable';
import Form2 from '../Form/Form2';
// import { datosJson, datosJsonPhones, datosJsonTv } from '../utils/datosJson';

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


const TAX_RATE = 0.105;

export default function Cart() {

  const [open, setOpen] = useState(false);
  const [modalResult, setModalResult] = useState()
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    cleanCart()
  }
	const cartContext = useContext(CartContext);
	const {cart, total, removeFromCart, cleanCart}= cartContext;  

  // La funcion ordenGenerate guarda en Firebase los datos de los productos comprados y del cliente, también actualiza el stock
    let order = {};
    const orderGenerate = (data) => { // "data" viene del formulario
      console.log(cart);
      console.log("esta es la data",data);
      order.date = firebase.firestore.Timestamp.fromDate(new Date());
      order.buyer = {
        name: data.firstName + " " + data.lastName,
        phone: data.phone,
        email: data.email,
      };
      order.total = total;
      order.items = cart.map((cartItem) => {
        const id = cartItem.sku;
        const nombre = cartItem.modelNumber;
        const precio = cartItem.regularPrice * cartItem.qty;

        return { id, nombre, precio };
      });
      console.log(order);
      
      // Ahora guardo la orden generada en Firebase:
      const db = getFirestore();
      const orderQuery = db.collection("orders");
      orderQuery
        .add(order)
        // .then((result) => alert(`El ID de la compra es: ${result.id}`))
        .then((result) => setModalResult(result.id))
        .then(() => handleOpen())
        .catch((error) => console.log(error));


      //Traigo los items comprados para actualizar stock
      const itemsToUpdate = db.collection('Items').where(
          firebase.firestore.FieldPath.documentId(), 'in', cart.map(i=> i.id)
      )
          console.log('Item a actualizar: '+itemsToUpdate);

      const batch = db.batch();
      
      // por cada item restar del stock la cantidad de el carrito
      itemsToUpdate.get()
      .then( collection=>{
          collection.docs.forEach(docSnapshot => {
              batch.update(docSnapshot.ref, {
              quantityLimit: docSnapshot.data().quantityLimit - cart.find(item => item.id === docSnapshot.id).qty
              })
          })

          batch.commit().then(res =>{
              console.log('resultado batch:', res)
          })
      })
      // .finally(()=>{
      //   setTimeout(() => {
      //     cleanCart()
      //   }, 9000);
      // })




    };

    // let productos={};
    // const datosGenerate = () => {
    //   console.log(cart);
    //   datosJsonPhones.products.map((cartItem) => {
    //     productos.sku = cartItem.sku;
    //     productos.modelNumber = cartItem.modelNumber;
    //     productos.regularPrice = cartItem.regularPrice;
    //     productos.name = cartItem.name;
    //     productos.quantityLimit = cartItem.quantityLimit;
    //     productos.manufacturer = cartItem.manufacturer;
    //     productos.image = cartItem.image
    //     productos.categoryId = "phones";
        
    //     const db = getFirestore();
    //     const orderQuery = db.collection("Items");
    //     orderQuery
    //       .add(productos)
    //       .then((result) => console.log(result))
    //       .catch((error) => console.log(error));
    //     return {productos}
    //   });
    // };

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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Thanks for your purchase 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {`The order ID is: ${modalResult}`}
          </Typography>
        </Box>
      </Modal>

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
            <Button size="small" variant="contained" color="primary" /* onClick={()=>datosGenerate()} */>
              return
            </Button>
          </Link>
        </Box>
      )}
    </>
  );
}
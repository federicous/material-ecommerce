
import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import HomePage from './components/HomePage/HomePage';
import { Typography, Container } from '@material-ui/core'
import HomePage2 from './components/HomePage2/HomePage2';
import Cart from './components/Cart/Cart';

function App() {

const [carrito, setcarrito] = useState(0)

  const addToCardWidget= (cantidad)=>{
      setcarrito(carrito+cantidad)
  }

  return (
    <BrowserRouter>
      <NavBar carrito={carrito} />
      <Container
        sx={{
          marginTop: "80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Switch>
          <Route exact path="/">
            {/* <HomePage/> */}
            <Typography variant={"h5"}>Categories</Typography>
            <HomePage2 />
          </Route>
          <Route exact path="/category/:category">
            <Typography variant={"h5"}>Products list</Typography>
            <ItemListContainer />
          </Route>
          <Route exact path="/detail/:sku">
            <Typography variant={"h5"}>Details</Typography>
            <ItemDetailContainer
              greeting="Lista de productos"
              initial={1}
              addToCardWidget={addToCardWidget}
            />
          </Route>
          <Route exact path="/cart">
            <Typography variant={"h5"}>Cart</Typography>
            <Cart />
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;

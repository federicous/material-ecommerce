
import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import HomePage from './components/HomePage/HomePage';
import { Typography, Container } from '@material-ui/core'
import HomePage2 from './components/HomePage2/HomePage2';

function App() {

const [carrito, setcarrito] = useState(0)

  const addToCardWidget= (cantidad)=>{
      setcarrito(carrito+cantidad)
  }

  return (
          <BrowserRouter>
            <NavBar carrito={carrito} />
            <Container sx={{
			marginTop:"80px",
			display:"flex", 
			flexDirection:"column",
      alignItems:"center",
			justifyContent:"center",
			}}>
            <Switch>
              <Route exact path="/">
                {/* <HomePage/> */}
                <HomePage2/>
              </Route>
              <Route exact path="/category/:category">
                <ItemListContainer 
                  // greeting="Lista de productos"
                  // initial={1}
                  // addToCardWidget={addToCardWidget}
                />
              </Route>
              <Route exact path="/detail/:sku">
                <ItemDetailContainer 
                  greeting="Lista de productos"
                  initial={1}
                  addToCardWidget={addToCardWidget}
                />
              </Route>

            </Switch>
            </Container>
          </BrowserRouter>
  );
}

export default App;

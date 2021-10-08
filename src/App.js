
import React, { useState,useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import { BrowserRouter, Switch, Route } from "react-router-dom";


function App() {


const [carrito, setcarrito] = useState(0)

  const addToCardWidget= (cantidad)=>{
      setcarrito(carrito+cantidad)
  }

  useEffect(() => {
    console.log("se agrego al carrito");
  }, [carrito])

  return (
          <BrowserRouter>
            <NavBar carrito={carrito} />
            <Switch>
              <Route exact path="/">
                <ItemListContainer
                greeting="Lista de productos"
                initial={1}
                stock={8}
                addToCardWidget={addToCardWidget}
                />
              </Route>


            </Switch>

          </BrowserRouter>
  );
}

export default App;


import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';


function App() {


const [carrito, setcarrito] = useState(0)

  const addToCardWidget= (cantidad)=>{
      setcarrito(carrito+cantidad)
  }

  // useEffect(() => {
  //   console.log("se agrego al carrito");
  // }, [carrito])

  return (
          <BrowserRouter>
            <NavBar carrito={carrito} />
            <Switch>
              <Route exact path="/">
                <ItemListContainer 
                  greeting="Lista de productos"
                  initial={1}
                  addToCardWidget={addToCardWidget}
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

          </BrowserRouter>
  );
}

export default App;

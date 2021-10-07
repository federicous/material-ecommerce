
import React, { useState,useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';

function App() {


const [carrito, setcarrito] = useState(0)

  const addToCardWidget= (cantidad)=>{
      setcarrito(carrito+cantidad)
  }

  useEffect(() => {
    console.log("se agrego al carrito");
  }, [carrito])

  return (
          <>
            <NavBar carrito={carrito} />
            <ItemListContainer
              greeting="Lista de productos"
              initial={1}
              stock={8}
              addToCardWidget={addToCardWidget}
            />
          </>
  );
}

export default App;

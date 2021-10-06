
import React, { useState,useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import { Container, Box } from '@material-ui/core';
function App() {

const [carrito, setcarrito] = useState(0)

  const addToCardWidget= (cantidad)=>{
      setcarrito(carrito+cantidad)
  }

  useEffect(() => {
    console.log("se agrego al carrito");
  }, [carrito])

  return (
    <div className="App">
    <NavBar carrito={carrito}/> 
       <Container>
      <Box m={4}>
        
          <ItemListContainer greeting="Lista de productos" initial={1} stock={8} addToCardWidget={addToCardWidget}/>
      </Box>  
       </Container>  
    </div>
  );
}

export default App;

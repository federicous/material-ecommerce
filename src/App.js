
import React, { useState,useEffect } from 'react';
import './App.css';
import ButtonAppBar from './components/NavBar/ButtonAppBar';
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
    <ButtonAppBar carrito={carrito}/> 
       <Container>
      <Box m={4}>
        
          <ItemListContainer greeting="Lista de productos" stock={8} addToCardWidget={addToCardWidget}/>
      </Box>  
       </Container>  
    </div>
  );
}

export default App;

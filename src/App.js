import './App.css';
import ButtonAppBar from './components/NavBar/ButtonAppBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import { Container, Box } from '@material-ui/core';
function App() {
  return (
    <div className="App">
    <ButtonAppBar/> 
       <Container>
      <Box m={4}>
        
          <ItemListContainer greeting="Lista de productos"/>
      </Box>  
       </Container>  
    </div>
  );
}

export default App;

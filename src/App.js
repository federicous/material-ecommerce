import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import { Typography, Container } from '@material-ui/core'
import HomePage2 from './components/HomePage2/HomePage2';
import Cart from './components/Cart/Cart';
import CartContextProvider from './components/CartContext/CartContext';
import Return from './components/utils/Return';
import Login from './components/Login/Login';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';

function App() {

  return (
    <CartContextProvider>
      <BrowserRouter>
        <NavBar />
        <Container
          sx={{
            marginTop: "80px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Routes>
            <Route exact path="/"  element={<Login />}/>
            <Route exact path="/home" element={<HomePage2 />} />
            <Route exact path="/category/:category" element={<ItemListContainer />} />
            <Route exact path="/detail/:sku" element={< ItemDetailContainer
                greeting="Lista de productos"
                initial={1} />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="*" element={<Return />} />       
          </Routes>
        </Container>
      </BrowserRouter>
    </CartContextProvider>
  );
}

export default App;

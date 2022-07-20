import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import { BrowserRouter, Switch, Route } from "react-router-dom";
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
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/home">
              <Typography variant={"h5"}>Categories</Typography>
              <HomePage2 />
            </Route>
            {/* <ProtectedRoutes exact path="/home" >
              <Typography variant={"h5"}>Categories</Typography>
              <HomePage2 />
            </ProtectedRoutes> */}

            <Route exact path="/category/:category">
              <Typography variant={"h5"}>Products list</Typography>
              <ItemListContainer />
            </Route>
            <Route exact path="/detail/:sku">
              <Typography variant={"h5"}>Details</Typography>
              <ItemDetailContainer
                greeting="Lista de productos"
                initial={1}
              />
            </Route>
            <Route exact path="/cart">
              <Typography variant={"h5"}>Cart</Typography>
              <Cart />
            </Route>
            <Route exact path="*">
              <Typography variant={"h5"} sx={{margin: "40px",}} >NOT FOUND 404</Typography>              
              <Return/>
            </Route>
          </Switch>
        </Container>
      </BrowserRouter>
    </CartContextProvider>
  );
}

export default App;

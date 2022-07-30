import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemListContainerSearch from './components/ItemListContainer/ItemListContainerSearch';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import { Container } from '@material-ui/core'
import HomePage2 from './components/HomePage2/HomePage2';
import Cart from './components/Cart/Cart';
import CartContextProvider from './components/CartContext/CartContext';
import Return from './components/utils/Return';
import Login from './components/Login/Login';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useMemo } from 'react';
import { blue, green } from '@material-ui/core/colors';


function App() {
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const prefersDarkMode = true;

  let theme =  createTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          mode: 'dark',
          primary: {
            // main: '#1565c0',
            main: blue[800]
          },
          secondary: {
            main: '#1565c0',
          },
          success: {
            main: green[800]
          }
        },
      });

  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
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
            <Route path="/" element={<ProtectedRoutes />}>
              <Route path="/home" element={<HomePage2 />} />
              <Route exact path="/category/:category" element={<ItemListContainer />} />
              <Route exact path="/search/:patron" element={<ItemListContainerSearch />} />
              <Route exact path="/detail/:sku" element={< ItemDetailContainer
                  greeting="Lista de productos"
                  initial={1} />} />
              <Route exact path="/cart" element={<Cart />} />     
            </Route>
            <Route exact path="*" element={<Return />} /> 
          </Routes>
        </Container>
      </BrowserRouter>
    </CartContextProvider>
    </ThemeProvider>

  );
}

export default App;

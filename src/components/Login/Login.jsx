import React, { useState, useEffect, useContext } from "react";
// import { Form } from "react-bootstrap";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  FormGroup,
  FormControl,
  Alert,
  Stack,
  Container,
  Backdrop,
  CircularProgress,
  InputLabel,
  IconButton,
} from "@material-ui/core";
import axios from "axios";
import { CartContext } from '../CartContext/CartContext';
import Cookies from "universal-cookie";
import HomePage2 from "../HomePage2/HomePage2";
// import {config} from "../../config/config"
import {config} from "../../config/config"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';

const cookies = new Cookies();

export default function Login() {
  // initial state
	const cartContext = useContext(CartContext);
	const {setUser}= cartContext;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [loginFail, setLoginFail] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false);
  // Backdrop or Loading spinner 
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const token = cookies.get("token");
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    setOpen(true)

    // set configurations
    const configuration = {
      method: "post",
      url: `${config.SERVER}/login`,
      data: {
        email,
        password,
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        setLogin(true);
        setUser(cookies.get("user"));
        cookies.set("token", result.data.token, {
          path: "/",
        });
        cookies.set("user", result.data.email, {
          path: "/",
        });
        // navigate(`/`, { replace: true });
        setOpen(false)
        window.location.href = "/";
      })
      .catch((error) => {
        setLoginFail(true);
        setErrorMessage(true)
        setOpen(false)
        error = new Error();
      });

  };

  return (
    <>
    {token ? (
    <HomePage2/>
    ):( <>
      {/* <ThemeProvider theme={theme}> */}
        {/* <CssBaseline /> */}
        <h2>Login</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
        <Container sx={{display:"flex", flexDirection:"column"}}>
          {/* email */}
          <FormGroup>
            <FormControl sx={{ mb: 2 }}>
              <TextField
                id="outlined-name"
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
          </FormGroup>

          {/* password */}
          <FormGroup>
            {/* <FormControl sx={{ mb: 2 }}>
              <TextField
                id="outlined-name"
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl> */}
            <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} >
                      <InputLabel htmlFor="outlined-adornment-password" >Password</InputLabel>
                            <OutlinedInput
                              id="outlined-adornment-password"
                              type={showPassword ? 'text' : 'password'}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                  >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                              }
                              // label="Password"
                              fullWidth
                              helperText={!password ? "Requiere: mayúscula, minúscula, número, +8 caracteres " : ""}
                              name="password"
                              label="Password"
                              // type="password"
                              // id="password"
                              autoComplete="new-password"
                              onChange={(e) => setPassword(e.target.value)}
                              
                            />
                  {/* <FormHelperText id="standard-weight-helper-text">{!password ? "Requiere: mayúscula, minúscula, número, +8 caracteres " : ""}</FormHelperText> */}
                </FormControl>
          </FormGroup>

          {/* submit button */}
          <Button
            sx={{ mb: 2 }}
            variant="contained"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Login
          </Button>
          {/* display success message */}
          <>
            <Stack sx={{ width: "100%",  mb: 2}} spacing={2}>
              {login ? (
                  <Alert severity="success">Autenticación Correcta</Alert>
              ) : (
                loginFail ? (
                <Alert severity="error">Error de Autenticación</Alert>
                ) : (
                  <><Alert severity="info">Ingrese sus credenciales</Alert></>
                )     
              )}
            </Stack>
            <Button sx={{color:"text.primary", textDecorationLine:"underline"}} onClick={() => navigate(`/register`, { replace: true })} >Crear cuenta</Button>
          </>
        </Container>
        </form>
      {/* </ThemeProvider> */}
    </>)
    }
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
        >
        <CircularProgress color="inherit" />
      </Backdrop>
     </>         
  );
}



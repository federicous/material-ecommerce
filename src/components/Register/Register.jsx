import * as React from 'react';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import { AppBar, Box, Toolbar, Badge, useMediaQuery, IconButton, Avatar, Button,CssBaseline,  TextField,FormControlLabel, Checkbox, Grid, Typography, Container, Select, MenuItem, InputLabel, FormControl} from '@material-ui/core'
import { ShoppingCart, LockOutlined } from '@material-ui/icons';
import { Link, useNavigate } from "react-router-dom";
import {provincias} from "../utils/provincias"
import {localidades} from "../utils/localidades"
import {config} from "../../config/config"
import axios from "axios";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import CheckIcon from '@material-ui/icons/Check';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Desarrollado por '}
      <Link to={`/home`} color="inherit">
        //SITECNIA
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


function capitalizeFirstLetter(string) {
  let cadena = string.toLowerCase()
  return cadena.charAt(0).toUpperCase() + cadena.slice(1);
}

export default function SignUp() {
  
  let navigate = useNavigate();

  const [provincia, setProvincia] = React.useState('');
  const [localidadArray, setLocalidadArray] = React.useState([]);
  const [vendedor, setVendedor] = React.useState('');
  const [localidad, setLocalidad] = React.useState('');
  const [nombre, setNombre] = React.useState('');
  const [nombreError, setNombreError] = React.useState(false);
  const [apellido, setApellido] = React.useState('');
  const [apellidoError, setApellidoError] = React.useState(false);
  const [correo, setCorreo] = React.useState('');
  const [correoError, setCorreoError] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');
  const [repeatPasswordError, setRepeatPasswordError] = React.useState(false);
  const [calle, setCalle] = React.useState('');
  const [calleError, setCalleError] = React.useState(false);
  const [altura, setAltura] = React.useState('');
  const [alturaError, setAlturaError] = React.useState(false);
  const [cuit, setCuit] = React.useState('');
  const [cuitError, setCuitError] = React.useState(false);
  const [ferreteria, setFerreteria] = React.useState('');
  const [ferreteriaError, setFerreteriaError] = React.useState(false);
  const [telefono, setTelefono] = React.useState('');
  const [telefonoError, setTelefonoError] = React.useState(false);
  const [botonSubmit, setBotonSubmit] = React.useState(true);
  const [passwordError, setPasswordError] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  
// React.useEffect(() => {
//   console.log(provincias);
// }, [])

let vendedorArray = [{nombre:"Leonel"}, {nombre:"Moises"}, {nombre:"Jeremias"}];

React.useEffect(() => {
  let array = localidades.filter((item)=> item.provincia.nombre.match(new RegExp(`${provincia}`,'gi')))
  let uniq = [...new Set(array)];
  setLocalidadArray(uniq)
  // console.log(localidades.filter((item)=> item.provincia.nombre.match(new RegExp(`${provincia}`,'gi'))));
}, [provincia])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log([...data.entries()]
    //   // email: data.get('email'),
    //   // password: data.get('password'),
    // );
    let registro={
      name: `${data.get('firstName')} ${data.get('lastName')}`,
      password: data.get('password'),
      email: data.get('email'),
      address: `${data.get('calle')} ${data.get('altura')}`,
      provincia: data.get('provincia'),
      localidad: data.get('localidad'),
      phone: data.get('telefono'),
      cuit: data.get('cuit'),
      ferreteria: data.get('ferreteria'),
      vendedor: data.get('vendedor')
    }
    // set configurations
    const configuration = {
      method: "post",
      // url: `${config.SERVER}/register`,
      url: `${config.SERVER}/register`,
      data: registro,
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        navigate(`/`, { replace: true });
      })
      .catch((error) => {
        error = new Error();
      });

  };

  function handleFirstName(e) {
    let firstName= e.target.value
    if (isBetween(firstName.length, 3, 25)) {
      setNombre(firstName)
      setNombreError(false)
    } else {
    setNombre('')
    setNombreError(true)
    }
  }

  function handleLastName(e) {
    let lastName= e.target.value
    if (isBetween(lastName.length, 3, 25)) {
      setApellido(lastName)
      setApellidoError(false)
    } else {
      setApellido('')
      setApellidoError(true)
    }
  }

  function handleEmail(e) {
    let email= e.target.value
    if (isEmailValid(email)) {
      setCorreo(email)
      setCorreoError(false)
    } else {
      setCorreo('')
      setCorreoError(true)
    }
  }

  function handlePassword(e) {
    let password= e.target.value
    if (isPasswordSecure(password)) {
      setPassword(password)
      setPasswordError(false)
    } else {
      setPassword('')
      setPasswordError(true)
    }
  }

  function handleRepeatPassword(e) {
    let password= e.target.value
      setRepeatPassword(password)
  }

  const handleProvincia = (event) => {
    setProvincia(event.target.value);
  };

  const handleLocalidad = (event) => {
    setLocalidad(event.target.value);
  };

  const handleVendedor = (event) => {
    setVendedor(event.target.value);
  };

  const handlePhone = (e) => {
    let telefono= e.target.value
    if (isNumber(telefono,10)) {
      setTelefono(telefono)
      setTelefonoError(false)
    } else {
    setTelefono('')
    setTelefonoError(true)
    }
  };

  const handleCuit = (event) => {
    let cuit= event.target.value
    if (isNumber(cuit,11)) {
      setCuit(cuit)
      setCuitError(false)
    } else {
    setCuit('')
    setCuitError(true)
    }
  };

  const handleFerreteria = (event) => {
    let ferreteria= event.target.value
    if (isBetween(ferreteria.length, 3, 130)) {
      setFerreteria(ferreteria)
      setFerreteriaError(false)
    } else {
    setFerreteria('')
    setFerreteriaError(true)
    }

  };

  const handleCalle = (event) => {
    let calle= event.target.value
    if (isBetween(calle.length, 3, 130)) {
      setCalle(calle)
      setCalleError(false)
    } else {
    setCalle('')
    setCalleError(true)
    }
  };

  const handleAltura = (event) => {
    let altura= event.target.value
    if (isBetween(altura.length, 1, 30)) {
      setAltura(altura)
      setAlturaError(false)
    } else {
    setAltura('')
    setAlturaError(true)
    }
  };

  React.useEffect(() => {
    if (nombre && apellido && correo && password && repeatPassword && calle && altura && cuit && ferreteria && telefono && provincia && localidad && vendedor) {
      setBotonSubmit(false)
    } else {
      setBotonSubmit(true)
    }
    
  }, [nombre, apellido, correo, password, repeatPassword, calle, altura, cuit, ferreteria, telefono, provincia, localidad, vendedor])
  
  React.useEffect(() => {
    if (repeatPassword && (password!=repeatPassword)) {
      setPasswordError(true)
    } else {
      setPasswordError(false)
    }
  }, [password, repeatPassword])
  
  const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isBetween = (length, min, max) => length < min || length > max ? false : true;

const isPasswordSecure = (password) => {
  // const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
  return re.test(password);
};

const isNumber = (number, min) => {
  const re = new RegExp(`^[0-9]{${min},}$`);
  return re.test(number);
}

  return (
    // <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registro 
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Nombre"
                  autoFocus
                  onChange={handleFirstName}
                  color={nombre ? "success" : "error"}
                  error={nombreError}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Apellido"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleLastName}
                  color={apellido ? "success" : "error"}
                  error={apellidoError}
                />
                <FormHelperText id="component-error-text">Error</FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Correo"
                  name="email"
                  autoComplete="email"
                  type="email"
                  onChange={handleEmail}
                  color={correo ? "success" : "error"}
                  error={correoError}
                />
              </Grid>
              <Grid item xs={12}>
                {/* <TextField
                  required
                  fullWidth
                  helperText={!password ? "Requiere: mayúscula, minúscula, número, +8 caracteres " : ""}
                  name="password"
                  // label="Contraseña"
                  // type="password"
                  // id="password"
                  autoComplete="new-password"
                  onChange={handlePassword}
                /> */}
                <FormControl variant="outlined" fullWidth required>
                      <InputLabel htmlFor="outlined-adornment-password" color={password ? "success" : "error"} error={passwordError}>Contraseña</InputLabel>
                            <OutlinedInput
                              id="password"
                              type={showPassword ? 'text' : 'password'}
                              color={password ? "success" : "error"}
                              error={passwordError}
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
                              label="Contraseña *"
                              // type="password"
                              // id="password"
                              autoComplete="new-password"
                              onChange={handlePassword}                    
                            />
                  <FormHelperText required id="standard-weight-helper-text">{!password ? "Requiere: mayúscula, minúscula, número, +8 caracteres " : ""}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                {/* <TextField
                  required
                  error={passwordError}
                  helperText={passwordError ? "No coinciden" : ""}
                  disabled={!password}
                  fullWidth
                  name="repeatPassword"
                  label="Repetir Contraseña"
                  type="password"
                  id="repeatPassword"
                  autoComplete="new-password"
                  onChange={handleRepeatPassword}
                /> */}
                <FormControl variant="outlined" fullWidth error={passwordError}      >
                      <InputLabel htmlFor="outlined-adornment-password" color={ password ? "success" : "error"} error={password!=repeatPassword} >Repetir Contraseña *</InputLabel>
                            <OutlinedInput
                              // id="outlined-adornment-password"
                              id="repeatPassword"
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
                              name="repeatPassword"
                              label="Repetir Contraseña *"
                              // type="password"
                              // id="password"
                              autoComplete="new-password"
                              disabled={!password}
                              onChange={handleRepeatPassword}   
                              required 
                              color={ password ? "success" : "error"}
                              error={password!=repeatPassword}
                            />
                  <FormHelperText id="standard-weight-helper-text">{passwordError ? "No coinciden" : ""}</FormHelperText>
                </FormControl>

              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" sx={{width:"100%"}} >
                  <InputLabel id="demo-simple-select-outlined-label">Provincia</InputLabel>
                  <Select
                  fullWidth
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={provincia}
                    onChange={handleProvincia}
                    label="Provincia"
                    name="provincia"
                    sx={{width:"100%"}}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {provincias.sort(function (a, b) {
                      if (a.iso_nombre > b.iso_nombre) {
                        return 1;
                      }
                      if (a.iso_nombre < b.iso_nombre) {
                        return -1;
                      }
                      // a must be equal to b
                      return 0;
                    }).map((item) => (
                      <MenuItem key={item.iso_nombre} value={item.iso_nombre}>{item.iso_nombre}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" sx={{width:"100%"}} disabled={!provincia} >
                <InputLabel id="demo-simple-select-outlined-label">Localidad</InputLabel>
                <Select
                fullWidth
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={localidad}
                  onChange={handleLocalidad}
                  label="Localidad"
                  sx={{width:"100%"}}
                  name="localidad"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {localidadArray.sort(function (a, b) {
                    if (a.nombre > b.nombre) {
                      return 1;
                    }
                    if (a.nombre < b.nombre) {
                      return -1;
                    }
                    // a must be equal to b
                    return 0;
                  }).map((item) => (
                    <MenuItem key={item.nombre} value={capitalizeFirstLetter(item.nombre)}>{capitalizeFirstLetter(item.nombre)}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="ferreteria"
                  label="Ferretería"
                  name="ferreteria"
                  autoComplete="ferreteria"
                  onChange={handleFerreteria}
                  color={ferreteria ? "success" : "error"}
                  error={ferreteriaError}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="calle"
                  label="Calle"
                  name="calle"
                  autoComplete="calle"
                  onChange={handleCalle}
                  color={calle ? "success" : "error"}
                  error={calleError}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="altura"
                  name="altura"
                  required
                  fullWidth
                  id="altura"
                  label="Altura"
                  onChange={handleAltura}
                  color={altura ? "success" : "error"}
                  error={alturaError}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="cuit"
                  name="cuit"
                  required
                  fullWidth
                  id="cuit"
                  label="CUIT"
                  type="number"
                  onChange={handleCuit}
                  color={cuit ? "success" : "error"}
                  error={cuitError}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="telefono"
                  label="Teléfono"
                  name="telefono"
                  autoComplete="telefono"
                  type="number"
                  onChange={handlePhone}
                  color={telefono ? "success" : "error"}
                  error={telefonoError}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
              <FormControl variant="outlined" sx={{width:"100%"}} >
                <InputLabel id="demo-simple-select-outlined-label">Vendedor</InputLabel>
                <Select
                fullWidth
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={vendedor}
                  onChange={handleVendedor}
                  label="Vendedor"
                  sx={{width:"100%"}}
                  name="vendedor"
                >
                  {vendedorArray.sort(function (a, b) {
                    if (a.nombre > b.nombre) {
                      return 1;
                    }
                    if (a.nombre < b.nombre) {
                      return -1;
                    }
                    // a must be equal to b
                    return 0;
                  }).map((item) => (
                    <MenuItem key={item.nombre} value={capitalizeFirstLetter(item.nombre)}>{capitalizeFirstLetter(item.nombre)}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={botonSubmit}
            >
              Registrar
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link style={{ color: "inherit", display: "flex", flexDirection: "row", alignItems: "center",}}
                 to={`/home`} >
                  Ya tiene una cuenta? Iniciar sesión
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ my: 4 }} />
      </Container>
    // </ThemeProvider>
  );
}
import * as React from 'react';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import { AppBar, Box, Toolbar, Badge, useMediaQuery, IconButton, Avatar, Button,CssBaseline,  TextField,FormControlLabel, Checkbox, Grid, Typography, Container, Select, MenuItem, InputLabel, FormControl} from '@material-ui/core'
import { ShoppingCart, LockOutlined } from '@material-ui/icons';
import { Link } from "react-router-dom";
import {provincias} from "../utils/provincias"
import {localidades} from "../utils/localidades"

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link to={`/home`} color="inherit">
        Your Website
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

const theme = createTheme();

export default function SignUp() {

  const [provincia, setProvincia] = React.useState('');
  const [localidadArray, setLocalidadArray] = React.useState([]);
  const [localidad, setLocalidad] = React.useState('');

  const handleChange = (event) => {
    setProvincia(event.target.value);
  };

  const handleChangeLocalidad = (event) => {
    setLocalidad(event.target.value);
  };

// React.useEffect(() => {
//   console.log(provincias);
// }, [])

React.useEffect(() => {
  let array = localidades.filter((item)=> item.provincia.nombre.match(new RegExp(`${provincia}`,'gi')))
  let uniq = [...new Set(array)];
  setLocalidadArray(uniq)
  // console.log(localidades.filter((item)=> item.provincia.nombre.match(new RegExp(`${provincia}`,'gi'))));
}, [provincia])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    // <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
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
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
              <FormControl variant="outlined" sx={{width:"100%"}} >
                <InputLabel id="demo-simple-select-outlined-label">Provincia</InputLabel>
                <Select
                fullWidth
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={provincia}
                  onChange={handleChange}
                  label="Provincia"
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
                    <MenuItem value={item.iso_nombre}>{item.iso_nombre}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
              <FormControl variant="outlined" sx={{width:"100%"}} >
                <InputLabel id="demo-simple-select-outlined-label">Localidad</InputLabel>
                <Select
                fullWidth
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={localidad}
                  onChange={handleChangeLocalidad}
                  label="Localidad"
                  sx={{width:"100%"}}
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
                    <MenuItem value={capitalizeFirstLetter(item.nombre)}>{capitalizeFirstLetter(item.nombre)}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Dirección"
                  name="lastName"
                  autoComplete="dirección"
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
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Dirección"
                  name="lastName"
                  autoComplete="dirección"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
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
        <Copyright sx={{ mt: 5 }} />
      </Container>
    // </ThemeProvider>
  );
}
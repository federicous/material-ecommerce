import React from 'react'
import { Table, TableBody, TableCell, TableContainer,TableHead, TableRow, Paper, Box, Grid, CardMedia, Link, Typography, Button, Backdrop, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Link as DomLink, useNavigate } from 'react-router-dom';
import { Delete } from '@material-ui/icons';
import './CartTable.css';
import axios from "axios";
// import {config} from "../../config/config";
import {config} from "../../config/config";
import Cookies from "universal-cookie";
import { CartContext } from '../CartContext/CartContext';
import ApiQuery from "../utils/apiQuery/apiQuery";
import ItemClass from '../utils/ItemClass/ItemClass';
let apiQuery = new ApiQuery();
let itemClass = new ItemClass();

const cookies = new Cookies();

function ccyFormat(num) {
  let numFloat = parseFloat(num)
	return `${numFloat.toFixed(2)}`;
      }
function ccyFormatOne(num) {
  let numFloat = parseFloat(num)
  return `${numFloat.toFixed(1)}`;
      }
    

const token = cookies.get("token");

// let dolar = config.DOLAR;


function capitalizeFirstLetter(string) {
  let cadena = string.toLowerCase()
  return cadena.charAt(0).toUpperCase() + cadena.slice(1);
}

const CartTable = ({cart, removeFromCart, total, ivaTotal, cleanCart}) => {
  const [isAdmin, setIsAdmin] = React.useState(false)
  const [listaUsuarios, setListaUsuarios] = React.useState([])
  const [usuario, setUsuario] = React.useState('');
  const [descuento, setDescuento] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState(false);
	const cartContext = React.useContext(CartContext);
	const {user, changeUser}= cartContext;
	// Backdrop or Loading spinner 
	const [open, setOpen] = React.useState(false);
  const [dolar, setDolar] = React.useState(0)

	const handleClose = () => {
	  setOpen(false);
	};
  let navigate = useNavigate();

  function calcularPrecio(precioConIva,iva,precio,usd,qty,oferta,precioOferta) {
    // let price = (oferta && oferta=="si" && precioOferta) ? ccyFormat(precioOferta) : precio
    // // let resultado = (precioConIva ? parseFloat(precioConIva)/(1+(parseFloat(typeof iva === "string" ? iva.replace(/,/g, '.').replace(/%/g, '') : iva))/100) : (price ? `${price}` : usd*dolar))*(qty ? parseFloat(qty) : 1);
    // let resultado = (precioConIva ? parseFloat(precioConIva)/(1+(parseFloat(typeof iva === "string" ? iva.replace(/,/g, '.').replace(/%/g, '') : iva))/100) : ((usd && usd != 0) ? usd*dolar : `${price}`))*(qty ? parseFloat(qty) : 1);
    // return ccyFormat(resultado)

    return(itemClass.calcularPrecioCantidad(precioConIva,iva,precio,usd,qty,oferta,precioOferta,dolar))
  }

  let handleOrden = () => {
    setOpen(true)
    let cancel = false;

    let configuration;

    if (usuario!=='') {
      console.log(`cliente seleccionado`);
      configuration = {
        method: "post",
        url: `${config.SERVER}/api/order/user`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: usuario,
        withCredentials: true,
      }
    } else {
      console.log(`sincliente`);
      configuration = {
        method: "post",
        url: `${config.SERVER}/api/order`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, 
      }
    }

          // make the API call
      axios(configuration)
      .then((result) => {
        if (cancel) return;
        console.log(result.data);
        // setProducts([...result.data.allProducts])
        // setPagesCant(Math.ceil(result.data.total/pageSize))
        // cleanCart();
        setOpen(false)
        navigate(`/alert/${result.data.ordenId}`, { replace: true });
      })
      .catch((error) => {
        setErrorMessage(true)
        setOpen(false)
        error = new Error();
      })
      return () => { 
        cancel = true;
      }
  }

  React.useEffect(() => {
    apiQuery.get(`/api/dolar`)
		.then((respuesta) => {
      setDolar(Number(respuesta.dolar));
		})

  }, [])

  React.useEffect(() => {
    apiQuery.get(`/permisos`)
    .then((respuesta)=>{
      setIsAdmin(respuesta)
      if (respuesta) {
        apiQuery.get(`/api/users`)
        .then((res)=>{
          setListaUsuarios(res)
        })
      }
    })
  }, [])

    React.useEffect(() => {
      if (usuario) {
        apiQuery.get(`/descuento?email=${usuario.email}`)
        .then((respuesta)=>{
          setDescuento(respuesta)
        })
      } else {
        apiQuery.get(`/descuento?email=${user}`)
        .then((respuesta)=>{
          setDescuento(respuesta)
        }) 
      }
  }, [usuario])
  
// React.useEffect(() => {

// console.log(cart);
// }, [])


  const handleUsuario = (event) => {
    setUsuario(event.target.value);
    changeUser(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  }

	return (
    <>
      <TableContainer component={Paper} sx={{ marginTop: "1rem", flex:'40%' }}>
        <Table className="table" aria-label="spanning table" sx={{pr:"0px"}}>
          <TableHead>
            {/* <TableRow>
              <TableCell align="center" colSpan={4}>
                Details
              </TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow> */}
            <TableRow>
              <TableCell align="center" sx={{pr:"0px"}}>Item</TableCell>
              <TableCell align="center" sx={{pr:"0px"}}></TableCell>
              <TableCell align="center" sx={{pr:"0px"}}>Cant.</TableCell>
              <TableCell align="center" sx={{pr:"0px"}}>P.Unit</TableCell>
              <TableCell align="center">S.Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((row) => (
              <TableRow key={row._id ? row._id : row.id}>
                <TableCell align="right" sx={{pr:"0px"}}
                  // sx={{
                  //   fontSize: 16,
                  //   // mt: 1,
                  //   m:0,
                  //   p:0,
                  //   width: "100%",
                  //   display: "flex",
                  //   flexDirection: "column",
                  //   justifyContent: "left",
                  //   alignItems: "center",
                  // }}
                >
                  <DomLink to={`/detail/${row._id ? row._id : row.id}`} style={{textDecoration: "none"}}>
                  <Box
                    component="span"
                    sx={{
                      fontSize: 12,
                      // m:0,
                      // p:0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign:'center',
                      maxWidth:"250px",
                      margin:"auto"
                    }}
                  >
                    <Box>
                    <CardMedia
                      component="img"
                      // image={row.image}
                      image={`${config.SERVER}/images/${row.image ? row.image : "sin_imagen.jpg"}`}
                      alt="imagen_producto"

                      sx={{ height: {xs:60, sm:90}, marginBottom: "1rem" }}
                    />
                    </Box>
                    <Typography sx={{textDecoration: "none", fontSize:{xs:"x-small",sm:"small",md:"medium"}}} color="text.primary" variant="caption">{capitalizeFirstLetter(`${
                           [row.name,row.color,row.linea,row.presentacion,`${(row.unidades!="0" && row.lista=="buloneria bremen") ? (`${row.unidades} unidades`) : ""}`,`${row.contenido ? (""+row.contenido) : ""}`].filter(Boolean).join(" | ")
                        }`)} ({row.code})</Typography>                  
                  </Box>
                  </DomLink>
                </TableCell>
                <TableCell align="center" sx={{pr:"0px"}}>
                  <Link sx={{cursor:"pointer", justifyContent:"center"}} onClick={() => removeFromCart(cart.indexOf(row))}>
                    <Button color='error' variant='contained' sx={{minWidth:"fit-content", p:"6px"}}>
                      <Delete />
                    </Button>
                  </Link>
                </TableCell>
                <TableCell align="center" sx={{pr:"0px"}}>{row.qty}</TableCell>
                {/* <TableCell align="center" sx={{pr:"0px"}}>{ccyFormat(row.price ? row.price : row.usd*dolar)}</TableCell> */}
                <TableCell align="center" sx={{pr:"0px"}}>
                  <Box
                      component="span"
                      sx={{
                        // fontSize: 12,
                        // m:0,
                        // p:0,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign:'center',
                        maxWidth:"250px",
                        margin:"auto"
                      }}
                    >
                      <Box>
                      {/* {ccyFormat(row.price ? row.price : row.usd*dolar)} */}
                  {/* {ccyFormat((row.precioConIva ? row.precioConIva-row.precioConIva*(parseFloat(typeof row.iva === "string" ? row.iva.replace(/,/g, '.').replace(/%/g, '') : row.iva))/100 : (row.price ? `${row.price}` : row.usd*dolar)))} */}
                  {calcularPrecio(row.precioConIva,row.iva,row.price,row.usd,1,row.oferta,row.precioOferta)}
                      </Box>
                      <Box sx={{color:"text.secondary"}}>
                      ({ccyFormatOne(parseFloat(typeof row.iva === "string" ? row.iva.replace(/,/g, '.').replace(/%/g, '') : row.iva))}%)
                      </Box>         
                    </Box>

                  </TableCell>
                <TableCell align="center">
                  {/* {ccyFormat((row.price ? row.price : row.usd*dolar) * row.qty)} */}
                  {/* {ccyFormat(((row.precioConIva ? row.precioConIva-row.precioConIva*(parseFloat(typeof row.iva === "string" ? row.iva.replace(/,/g, '.').replace(/%/g, '') : row.iva))/100 : (row.price ? `${row.price}` : row.usd*dolar)))*row.qty)} */}
                  {calcularPrecio(row.precioConIva,row.iva,row.price,row.usd,row.qty,row.oferta,row.precioOferta)}
                  {/* {row.precioConIva ? row.precioConIva : (row.price ? `$ ${row.price}` : "NO DISPONIBLE") } */}
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell rowSpan={4} />
              <TableCell colSpan={3}>Subtotal</TableCell>
              <TableCell align="center">{ccyFormat(parseFloat(total))}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>IVA</TableCell>
              {/* <TableCell align="right">{``}</TableCell> */}
              <TableCell align="center">{ccyFormat(parseFloat(ivaTotal))}</TableCell>
            </TableRow>
            {descuento ? <>
              <TableRow>
                <TableCell colSpan={3}>Descuento ({parseFloat(descuento)}%)</TableCell>
                <TableCell align="center">- {ccyFormat(parseFloat(descuento)/100*(parseFloat(total)))}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}>TOTAL</TableCell>
                <TableCell align="center">{ccyFormat((parseFloat(total)+parseFloat(ivaTotal))-(parseFloat(descuento)/100*(parseFloat(total))))}</TableCell>
              </TableRow>
            </> : <>
            <TableRow>
              <TableCell colSpan={3}>TOTAL</TableCell>
              <TableCell align="center">{ccyFormat((parseFloat(total)+parseFloat(ivaTotal)))}</TableCell>
            </TableRow>            
            </>}
          </TableBody>
        </Table>
      </TableContainer>
      {isAdmin ? <>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                <FormControl variant="outlined" sx={{width:"100%"}} >
                  <InputLabel id="demo-simple-select-outlined-label">Cliente</InputLabel>
                  <Select
                  fullWidth
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={usuario}
                    onChange={handleUsuario}
                    label="Cliente"
                    name="cliente"
                    sx={{width:"100%"}}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {listaUsuarios.sort(function (a, b) {
                      if (a.name > b.name) {
                        return 1;
                      }
                      if (a.name < b.name) {
                        return -1;
                      }
                      // a must be equal to b
                      return 0;
                    }).map((item) => (
                      <MenuItem key={item.name} value={item}>{`${
                        [item.name,item.ferreteria].filter(Boolean).join(" - ")
                        }`}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button sx={{ width:"100%"}} variant='contained' 
                onClick={handleOrden}
                disabled={usuario ? false : true}
                >
                  Enviar orden
                </Button>
              </Grid>
            </Grid>
        </Box>        

      </> : <>
      <Button sx={{my:3}} variant='contained' 
      onClick={handleOrden}
      >
        Enviar orden
      </Button>
      
      </>}

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

export default CartTable
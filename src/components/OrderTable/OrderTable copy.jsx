import React from 'react'
import { Table, TableBody, TableCell, TableContainer,TableHead, TableRow, Paper, Box, CardMedia, Link, Typography, Button, Backdrop, CircularProgress } from '@material-ui/core';
import { Link as DomLink, useNavigate } from 'react-router-dom';
import { Delete } from '@material-ui/icons';
import './OrderTable.css';
import axios from "axios";
import {config} from "../../config/config";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function ccyFormat(num) {
	return `${num.toFixed(2)}`;
      }
function ccyFormatOne(num) {
  return `${num.toFixed(1)}`;
      }
    
const token = cookies.get("token");

let dolar = config.DOLAR;

function capitalizeFirstLetter(string) {
  let cadena = string.toLowerCase()
  return cadena.charAt(0).toUpperCase() + cadena.slice(1);
}

const OrderTable = ({cart, removeFromCart, total, ivaTotal, cleanCart}) => {

  const [errorMessage, setErrorMessage] = React.useState(false);
	// Backdrop or Loading spinner 
	const [order, setOrder] = React.useState([]);
	const [open, setOpen] = React.useState(false);
	const handleClose = () => {
	  setOpen(false);
	};
  let navigate = useNavigate();

  let handleOrden = () => {
    setOpen(true)
    let cancel = false;
    const configuration = {
      method: "post",
      url: `${config.SERVER}/api/order`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
          // make the API call
      axios(configuration)
      .then((result) => {
        if (cancel) return;
        console.log(result.data);
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
    let cancel = false;
    if (cookies.get("user")) {
      const configuration = {
        method: "get",
        // url: `${config.SERVER}/api/categorias/label`,
        url: `${config.SERVER}/api/order`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };
  
            // make the API call
        axios(configuration)
        .then((result) => {
          if (cancel) return;
          setOrder([...result.data])
          console.log([...result.data]);
          console.log([...result.data][0].timestamp);
          let fecha= [...result.data][0].timestamp
          dateFormat(fecha)
        })
        .catch((error) => {
          error = new Error();
        })
        return () => { 
          cancel = true;
        }
    }
  }, [])
  
  function dateFormat(timestamp) {
    let objectDate = new Date(timestamp)
    let day = objectDate.getDate();
    let month = objectDate.getMonth();
    let year = objectDate.getFullYear();

    if (day < 10) {day = '0' + day;}
    if (month < 10) {month = `0${month}`;}

    let format1 = `${day}/${month}/${year}`;
    console.log(format1); 
    return format1
  }

	return (
    <>
      <TableContainer component={Paper} sx={{ marginTop: "1rem", flex:'40%' }}>
        <Table className="table" aria-label="spanning table" sx={{pr:"0px"}}>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{pr:"0px"}}>Fecha</TableCell>
              <TableCell align="center" sx={{pr:"0px"}}></TableCell>
              <TableCell align="center" sx={{pr:"0px"}}>Cant.</TableCell>
              <TableCell align="center" sx={{pr:"0px"}}>P.Unit</TableCell>
              <TableCell align="center">S.Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.map((row) => (
              <TableRow key={row._id ? row._id : row.id}>
                <TableCell align="right" sx={{pr:"0px"}}>
                  <DomLink to={`/detail/${row._id ? row._id : row.id}`} style={{textDecoration: "none"}}>
                  <Box
                    component="span"
                    sx={{
                      fontSize: 12,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign:'center',
                      maxWidth:"250px",
                      margin:"auto"
                    }}
                  >
                    <Typography sx={{textDecoration: "none", fontSize:{xs:"x-small",sm:"small",md:"medium"}}} color="text.primary" variant="caption">
                      {dateFormat(row.timestamp)}
                    </Typography>                  
                  </Box>
                  </DomLink>
                </TableCell>
                <TableCell align="center" sx={{pr:"0px"}}>
                  <Link sx={{cursor:"pointer", justifyContent:"center"}} onClick={() => removeFromCart(cart.indexOf(row))}>
                    <Button color='primary' variant='contained' sx={{minWidth:"fit-content", p:"6px"}}>
                      Ver
                    </Button>
                  </Link>
                </TableCell>
                <TableCell align="center" sx={{pr:"0px"}}>{row.qty}</TableCell>
                {/* <TableCell align="center" sx={{pr:"0px"}}>{ccyFormat(row.price ? row.price : row.usd*dolar)}</TableCell> */}
                <TableCell align="center" sx={{pr:"0px"}}>
                  <Box
                      component="span"
                      sx={{
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
                      {ccyFormat(row.price ? row.price : row.usd*dolar)}
                      </Box>
                      <Box sx={{color:"text.secondary"}}>
                      ({ccyFormatOne(parseFloat(typeof row.iva === "string" ? row.iva.replace(/,/g, '.') : row.iva))}%)
                      </Box>         
                    </Box>

                  </TableCell>
                <TableCell align="center">
                  {row.productList.length}
                </TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>
      <Button sx={{my:3}} variant='contained' 
      onClick={handleOrden}
      >
        Enviar orden
      </Button>
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

export default OrderTable
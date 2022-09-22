import React from 'react'
import { Table, TableBody, TableCell, TableContainer,TableHead, TableRow, Paper, Box, CardMedia, Link, Typography, Button, Backdrop, CircularProgress, Collapse } from '@material-ui/core';
import './OrderTable.css';
import axios from "axios";
import {config} from "../../config/config";
import Cookies from "universal-cookie";
import { KeyboardArrowUp, KeyboardArrowDown, } from '@material-ui/icons';

const cookies = new Cookies();

function ccyFormat(num) {
	return `${num.toFixed(2)}`;
      }
function ccyFormatOne(num) {
  return `${num.toFixed(1)}`;
      }

function dateFormat(timestamp) {
  let objectDate = new Date(timestamp)
  let day = objectDate.getDate();
  let month = objectDate.getMonth();
  let year = objectDate.getFullYear();
  let hour = objectDate.getHours();
  let minute = objectDate.getMinutes();

  if (day < 10) {day = '0' + day;}
  if (month < 9) {month = `0${month+1}`;}
  if (hour < 10) {hour = '0' + hour;}
  if (minute < 10) {minute = `0${minute}`;}

  let format1 = `${day}/${month}/${year-2000} ${hour}:${minute}`;
  return format1
}
      
    
const token = cookies.get("token");

let dolar = config.DOLAR;

function capitalizeFirstLetter(string) {
  let cadena = string.toLowerCase()
  return cadena.charAt(0).toUpperCase() + cadena.slice(1);
}


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <Button
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            sx={{color:"inherit"}}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </Button>
        </TableCell>
        <TableCell component="th" scope="row">
          {dateFormat(row.timestamp)}
        </TableCell>
        <TableCell align="center">{parseFloat(row.productList.reduce((previousValue, currentValue) => parseFloat(previousValue) + parseFloat(currentValue.qty),0))}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Orden ID: {row._id ? row._id : row.id}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Código</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell align="right">Cant.</TableCell>
                    <TableCell align="right">P.Unit ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.productList.map((productListRow) => (
                    <TableRow key={productListRow._id ? productListRow._id : productListRow.id}>
                      <TableCell component="th" scope="row">
                        {productListRow.code}
                      </TableCell>
                      <TableCell>{capitalizeFirstLetter(`${
                        [productListRow.name,productListRow.color,productListRow.linea,productListRow.presentacion,`${productListRow.contenido ? (""+productListRow.contenido) : ""}`].filter(Boolean).join("|")
                        }`)}</TableCell>
                      <TableCell align="right">{productListRow.qty}</TableCell>
                      <TableCell align="right">
                      {ccyFormat(productListRow.price ? productListRow.price : productListRow.usd*dolar)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


export default function CollapsibleTable() {


  const [errorMessage, setErrorMessage] = React.useState(false);
  // Backdrop or Loading spinner 
  const [order, setOrder] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
 
  React.useEffect(() => {
    let cancel = false;
    setLoading(true)
    if (cookies.get("user")) {
      const configuration = {
        method: "get",
        url: `${config.SERVER}/api/order/user`,
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
          setLoading(false)
        })
        .catch((error) => {
          setErrorMessage(true)
          setLoading(false)
          error = new Error();
        })
        return () => { 
          cancel = true;
        }
    }
  }, [])
  
  
  return (
    <>
    	{loading ? (<>
				<Box sx={{ display: 'flex', mt:"30vh", height:"100%" }}>
					<CircularProgress />
				</Box>			
			</>) : (<>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Fecha</TableCell>
                <TableCell align="center">Productos</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.map((row) => (
                <Row key={row._id ? row._id : row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
			</>)}
    
    </>


  );
}


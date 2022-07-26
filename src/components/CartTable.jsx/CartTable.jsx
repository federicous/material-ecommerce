import React from 'react'
import { Table, TableBody, TableCell, TableContainer,TableHead, TableRow, Paper, Box, CardMedia, Link, } from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';
import 'firebase/firestore';
import './CartTable.css';

function ccyFormat(num) {
	return `${num.toFixed(2)}`;
      }

const CartTable = ({cart, removeFromCart, total, }) => {
	return (
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
            <TableRow key={row._id}>
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
                <Box
                  component="span"
                  sx={{
                    fontSize: 12,
                    m:0,
                    p:0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    textAlign:'justify'
                  }}
                >
                  <Box>
                  <CardMedia
                    component="img"
                    // image={row.image}
                    image={`http://localhost:8088/images/${row.image}`}
                    alt="notebook"

                    sx={{ height: {xs:50, sm:90}, marginBottom: "1rem" }}
                  />
                  </Box>
                  {row.label} ({row.code})
                </Box>
              </TableCell>
              <TableCell align="right" sx={{pr:"0px"}}>
                <Link sx={{cursor:"pointer"}} onClick={() => removeFromCart(cart.indexOf(row))}>
                <DeleteForever />
                </Link>
              </TableCell>
              <TableCell align="center" sx={{pr:"0px"}}>{row.qty}</TableCell>
              <TableCell align="center" sx={{pr:"0px"}}>{row.price}</TableCell>
              <TableCell align="center">
                {ccyFormat(row.price * row.qty)}
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}></TableCell>
            <TableCell colSpan={1}>TOTAL</TableCell>
            <TableCell align="center">{ccyFormat(parseFloat(total))}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CartTable
import React from 'react'
import { Table, TableBody, TableCell, TableContainer,TableHead, TableRow, Paper, Box, CardMedia, Button, Link, } from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';
import 'firebase/firestore';
import './CartTable.css';

function ccyFormat(num) {
	return `${num.toFixed(2)}`;
      }

const CartTable = ({cart, removeFromCart, total, }) => {
	return (
    <TableContainer component={Paper} sx={{ marginTop: "1rem", flex:'40%' }}>
      <Table className="table" aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={4}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.map((row) => (
            <TableRow key={row.sku}>
              <TableCell
                sx={{
                  fontSize: 16,
                  mt: 1,
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "left",
                  alignItems: "center",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    fontSize: 12,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <Box>
                  <CardMedia
                    component="img"
                    image={row.image}
                    alt="notebook"
                    sx={{ height: 90, marginBottom: "1rem" }}
                  />
                  </Box>
                {row.manufacturer} ({row.modelNumber})
                </Box>
              </TableCell>
              <TableCell align="right">
                <Link sx={{cursor:"pointer"}} onClick={() => removeFromCart(cart.indexOf(row))}>
                <DeleteForever />
                </Link>
              </TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.regularPrice}</TableCell>
              <TableCell align="right">
                {ccyFormat(row.regularPrice * row.qty)}
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell align="right">{ccyFormat(parseFloat(total))}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CartTable
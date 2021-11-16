import React from 'react'
import { Table, TableBody, TableCell, TableContainer,TableHead, TableRow, Paper, Box, CardMedia, Button, } from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';
import 'firebase/firestore'
import Form from '../Form/Form';
import Form2 from '../Form/Form2';

function ccyFormat(num) {
	return `${num.toFixed(2)}`;
      }

const CartTable = ({cart, removeFromCart, total, TAX_RATE, orderGenerate}) => {
	return (
    <TableContainer component={Paper} sx={{ marginTop: "1rem", flex:'40%' }}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
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
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={row.image}
                    alt="notebook"
                    sx={{ height: 60, marginRight: "1rem" }}
                  />
                </Box>
                {row.manufacturer} ({row.modelNumber})
              </TableCell>
              <TableCell align="right">
                <Button
                  size="small"
                  variant="contained"
                  color="warning"
                  onClick={() => removeFromCart(cart.indexOf(row))}
                >
                  <DeleteForever />
                </Button>
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
            <TableCell colSpan={3}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(parseInt(total))}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell colSpan={2} align="right">{`${(TAX_RATE * 100).toFixed(
              0
            )} %`}</TableCell>
            <TableCell colSpan={2} align="right">
              {ccyFormat(parseInt(TAX_RATE * total))}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell align="right">
              {ccyFormat(parseInt(TAX_RATE * total + total))}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CartTable
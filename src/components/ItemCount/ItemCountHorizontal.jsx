import React, {useContext, useState } from 'react'
import { Button, ButtonGroup, Box, TextField,Typography} from '@material-ui/core'
import { AddShoppingCart, Add, Remove } from '@material-ui/icons';
// import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import { Link } from 'react-router-dom'
import { CartContext } from '../CartContext/CartContext';
import Return from '../utils/Return';
import './itemCount.css';


const ItemCount = ({initial, sku, stock, product, price}) => {

	const cartContext = useContext(CartContext);
	const {addToCart}= cartContext;
	const [contador, setContador] = useState(initial)
	const [visibilty, setVisibilty] = useState(true)
	const [result, setResult] = useState(stock)

	function addItem() {
		if (Number(contador) < Number(result)) {
			setContador(Number(contador)+1)
		}
	}

	function removeItem() {
		if (Number(contador)>1) {
			setContador(Number(contador)-1)		
		}
	}

	function addCart(counter) {
		if (Number(counter)<=Number(stock)) {
			addToCart(product, Number(counter))
			setResult(Number(stock)-Number(counter))
			setContador(Number(initial))
			setVisibilty(false)
		}
	}

	function setContadorFunction(value) {
		if (Number(contador)<Number(stock)) {
			setContador(Number(value))
		} else {
			setContador(Number(stock)-1)
		}

	}

return (
	<>
	{visibilty ? (
		<Box  sx={{ fontSize: 16, mt: 1, width:"100%", display:"flex", flexDirection:"column", justifyContent:"space-evenly", alignItems:"center", marginX:"5px", maxWidth:"150px" }}>
			<ButtonGroup size="small" variant="contained" aria-label="outlined primary button group">
				<Button onClick={()=>removeItem()}><Remove/></Button>
				{/* <Box component="span" sx={{ fontSize: 12, display:"flex", flexDirection:"row", justifyContent:"space-evenly", alignItems:"center" }}>{contador}</Box> */}
				<Box component="div" sx={{ fontSize: 12, display:"flex", flexDirection:"row", justifyContent:"space-evenly", alignItems:"center",width:"100%" }}>    
					<TextField onChange={(e) => setContadorFunction(e.target.value)} sx={{ width:"100%", input: {textAlign: "center" }}}    id="standard-number"
						type="number"
						value={contador}							
						InputLabelProps={{
						shrink: true,
						}}
						variant="standard"
				/></Box>
				<Button onClick={()=>addItem()}><Add/></Button>
			</ButtonGroup>
			<Box sx={{ width:"100%", mt:{xs:1,md:2} }}>
			{initial ? (
				<>
				<Box sx={{display:"flex"}}>
				<Typography sx={{ fontWeight: "bold", textDecoration: "none", color:"text.primary" }} variant="h6">
					    {price}
					  </Typography>
					<Button disabled={price ? false : true} size="medium" variant="contained" color="success"  sx={{ fontSize: 12, width:"100%", height:"100%", textAlign:"center" }}
					onClick={()=>addCart(contador)} ><AddShoppingCart fontSize="small"/> </Button>
				</Box>
								            
				</>

			):(
					<Link to={`/`}>
						<Button size="small" variant="contained" color="primary"  sx={{ fontSize: 12, width:"100%" }}
						>Return</Button>
					</Link>	
			)}
			</Box>

		</Box>
		
	):(
		<Box  sx={{ fontSize: 16, mt: 1, width:"100%", display:"flex", flexDirection:"row", justifyContent:"space-evenly", alignItems:"center" }}>

			<Link to={`/cart`} style={{ textDecoration:"none", color:"inherit"}}>
				<Button size="small" variant="contained" color="primary"  sx={{ fontSize: 12, width:"100%",  }}>Carrito</Button>
			</Link>
		</Box>

	)}
	</>
)
}

export default ItemCount
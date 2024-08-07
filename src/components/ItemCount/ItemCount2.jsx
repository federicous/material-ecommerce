import React, {useContext, useState } from 'react'
import { Button, ButtonGroup, Box, TextField} from '@material-ui/core'
import { AddShoppingCart, Add, Remove } from '@material-ui/icons';
// import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import { Link } from 'react-router-dom'
import { CartContext } from '../CartContext/CartContext';
import Return from '../utils/Return';
import './itemCount.css';


const ItemCount = ({initial, sku, stock, product, price}) => {

	const cartContext = useContext(CartContext);
	const {addToCart}= cartContext;
	const [contador, setContador] = useState((product.multiplicador && !isNaN(Number(product.multiplicador))) ? (Number(initial))*(Number(product.multiplicador)) : Number(initial))
	const [visibilty, setVisibilty] = useState(true)
	const [result, setResult] = useState(stock)

	function roundToNearestFloor(number,multiplo) {
		return Math.floor(number/multiplo) * multiplo;
	}	
	
	function roundToNearestCeil(number,multiplo) {
		return Math.ceil(number/multiplo) * multiplo;
	}

	function addItem() {
		if ((product.multiplicador && !isNaN(Number(product.multiplicador)))) {
			if (Number(contador) < Number(result)) {
				let contadorMultiplo=roundToNearestFloor(contador,product.multiplicador)
				setContador(Number(contadorMultiplo)+Number(product.multiplicador))
			}
		} else {		
			if (Number(contador) < Number(result)) {
				setContador(Number(contador)+1)
			}
		}
	}

	function removeItem() {
		if (product.multiplicador && !isNaN(Number(product.multiplicador))) {
			if (Number(contador) > Number(product.multiplicador)) {
				let contadorMultiplo=roundToNearestCeil(contador,product.multiplicador)
				setContador(Number(contadorMultiplo)-Number(product.multiplicador))
			}
		} else {
			if (Number(contador)>1) {
				setContador(Number(contador)-1)		
			}
		}
	}

	function addCart(counter) {
		if (Number(counter)<=Number(stock)) {
			if (product.multiplicador && !isNaN(Number(product.multiplicador))) {
				let contadorMultiplo=roundToNearestCeil(contador,product.multiplicador)
				addToCart(product, Number(contadorMultiplo))
			} else {
				addToCart(product, Number(counter))
			}
			setResult(Number(stock)-Number(counter))
			setContador(Number(initial))
			setVisibilty(false)
		}
	}

	function setContadorFunction(e) {
		let value = e.target.value
			if (Number(contador)<Number(stock) && Number(value)>=0) {
				setContador(Number(value))
			} else if (Number(value)>=0) {
				setContador(Number(stock)-1)
			} else {
				setContador(0)
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
					<TextField onInput={()=>console.log("oninput")} onChange={(e) => setContadorFunction(e)} sx={{ width:"100%", input: {textAlign: "center" }}}    id="standard-number"
						type="number"
						// value={multiplicador(contador,tipeo)}							
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
					<Button disabled={price ? false : true} size="medium" variant="contained" color="success"  sx={{ fontSize: 12, width:"100%", height:"100%", textAlign:"center" }}
					onClick={()=>addCart(contador)} ><AddShoppingCart fontSize="small"/> </Button>
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
			{/* <Link to={`/`} style={{ textDecoration:"none", color:"inherit"}}>
				<Button size="small" variant="contained" color="primary"  sx={{ fontSize: 12, width:"100%",  }}
				>Return</Button>
			</Link>	 */}
			<Link to={`/cart`} style={{ textDecoration:"none", color:"inherit"}}>
				<Button size="small" variant="contained" color="primary"  sx={{ fontSize: 12, width:"100%",  }}>Carrito</Button>
			</Link>
		</Box>

	)}
	</>
)
}

export default ItemCount
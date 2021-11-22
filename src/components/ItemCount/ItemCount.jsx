import React, {useContext, useState } from 'react'
import { Button, ButtonGroup, Box} from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons';
import { Link } from 'react-router-dom'
import { CartContext } from '../CartContext/CartContext';
import Return from '../utils/Return';


const ItemCount = ({initial, sku, stock, product}) => {

	const cartContext = useContext(CartContext);
	const {addToCart}= cartContext;
	const [contador, setContador] = useState(initial)
	const [visibilty, setVisibilty] = useState(true)
	const [result, setResult] = useState(stock)

	function addItem() {
		if (contador < result) {
			setContador(contador+1)
		}
	}

	function removeItem() {
		if (contador>1) {
			setContador(contador-1)		
		}
	}

	function addCart(counter) {
		addToCart(product, counter)
		setResult(stock-counter)
		setContador(initial)	
		setVisibilty(false)
	}

return (
	<>
	{visibilty ? (
		<Box  sx={{ fontSize: 16, mt: 1, width:"100%", display:"flex", flexDirection:"row", justifyContent:"space-evenly", alignItems:"center" }}>
			<ButtonGroup size="small" variant="contained" aria-label="outlined primary button group">
				<Button onClick={()=>removeItem()}>-</Button>
				<Box component="span" sx={{ fontSize: 12, display:"flex", flexDirection:"row", justifyContent:"space-evenly", alignItems:"center" }}>{contador}</Box>
				<Button onClick={()=>addItem()}>+</Button>
			</ButtonGroup>
			{initial ? (
			<Box>
				<Button size="small" variant="contained" color="success"  sx={{ fontSize: 12, width:"100%" }}
				startIcon={<ShoppingCart/>}
				onClick={()=>addCart(contador)} >Add</Button>
			</Box>
			):(
				<Box>
					<Link to={`/`}>
						<Button size="small" variant="contained" color="primary"  sx={{ fontSize: 12, width:"100%" }}
						>Return</Button>
					</Link>	
				</Box>
			)}
		</Box>
		
	):(
		<Box  sx={{ fontSize: 16, mt: 1, width:"100%", display:"flex", flexDirection:"row", justifyContent:"space-evenly", alignItems:"center" }}>
			<Return />
			<Link to={`/cart`} style={{ textDecoration:"none", color:"inherit"}}>
				<Button size="small" variant="contained" color="primary">Cart</Button>
			</Link>
		</Box>

	)}
	</>
)
}

export default ItemCount
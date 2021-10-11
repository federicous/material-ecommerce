import React, {useState } from 'react'
import { Button, ButtonGroup, Box} from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons';

const ItemCount = ({initial, stock, addToCardWidget}) => {
console.log({initial});
const [contador, setContador] = useState(initial)

function addItem() {
	if (contador < stock) {
		setContador(contador+1)
	}
}

function removeItem() {
	if (contador>1) {
		setContador(contador-1)		
	}
}

return (
	<Box  sx={{ fontSize: 16, mt: 1, width:"100%", display:"flex", flexDirection:"row", justifyContent:"space-evenly", alignItems:"center" }}>
		<ButtonGroup variant="contained" aria-label="outlined primary button group">
			<Button onClick={()=>removeItem()}>-</Button>
			<Box component="span" sx={{ fontSize: 12, display:"flex", flexDirection:"row", justifyContent:"space-evenly", alignItems:"center" }}>{contador}</Box>
			<Button onClick={()=>addItem()}>+</Button>
		</ButtonGroup>
		<Box>
			<Button variant="contained" color="success"  sx={{ fontSize: 12, width:"100%" }}
			startIcon={<ShoppingCart/>}
			onClick={()=>addToCardWidget(contador)} >Add</Button>
		</Box>
	</Box>
)
}

export default ItemCount
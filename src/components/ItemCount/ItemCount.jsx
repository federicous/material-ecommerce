import React, {useState } from 'react'
import { Button, ButtonGroup, Box} from '@material-ui/core'
import { flexbox } from '@material-ui/system'

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
<Box>
	<ButtonGroup variant="contained" aria-label="outlined primary button group">
		<Button onClick={()=>removeItem()}>-</Button>
		<Box component="span" sx={{ fontSize: 16, mt: 1 }}>{contador}</Box>
		<Button onClick={()=>addItem()}>+</Button>
	</ButtonGroup>
	<Box>
		<Button onClick={()=>addToCardWidget(contador)} >Add</Button>
	</Box>
</Box>
)
}

export default ItemCount
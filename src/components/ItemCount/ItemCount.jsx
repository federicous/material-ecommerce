import React, {useState } from 'react'
import { Button, ButtonGroup, TextField} from '@material-ui/core'

const ItemCount = ({stock, addToCardWidget}) => {

const [contador, setContador] = useState(1)

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
<div>
	<ButtonGroup variant="contained" aria-label="outlined primary button group">
		<Button onClick={()=>removeItem()}>-</Button>
		<TextField id="outlined-basic" label={contador} variant="outlined" size="small" />
		<Button onClick={()=>addItem()}>+</Button>
	</ButtonGroup>
	<Button onClick={()=>addToCardWidget(contador)} >Add</Button>
</div>
)
}

export default ItemCount
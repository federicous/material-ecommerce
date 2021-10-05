import React from 'react'
import { Button, ButtonGroup, TextField} from '@material-ui/core'

const ItemCount = () => {
return (
<div>
	<ButtonGroup variant="contained" aria-label="outlined primary button group">
		<Button>-</Button>
		<TextField id="outlined-basic" label="0" variant="outlined" />
		<Button>+</Button>
	</ButtonGroup>
	<Button>Add</Button>
</div>
)
}

export default ItemCount
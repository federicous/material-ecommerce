import React from 'react'
import Item from '../Item/Item'

const ItemList = ({initial, stock, addToCardWidget}) => {
	return (
		<>
			<Item
			 initial={initial} 
			 stock={stock} 
			 addToCardWidget={addToCardWidget}
			/>
		</>
	)
}

export default ItemList
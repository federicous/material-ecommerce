import React from 'react'
import ItemList from '../ItemList/ItemList'

const ItemListContainer = ({greeting, initial, stock, addToCardWidget}) => {
	return (
		<>
			<h3>{greeting}</h3>
			<ItemList	 initial={initial} stock={stock} addToCardWidget={addToCardWidget}/>
		</>
	)
}

export default ItemListContainer

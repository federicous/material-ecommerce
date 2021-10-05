import React from 'react'
import MediaCard from '../Card/Card'

const ItemListContainer = ({greeting, stock, addToCardWidget}) => {
	return (
		<div>
			<h3>{greeting}</h3>
			<MediaCard stock={stock} addToCardWidget={addToCardWidget}/>
		</div>
	)
}

export default ItemListContainer

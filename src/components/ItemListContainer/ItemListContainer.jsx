import React from 'react'
import MediaCard from '../Card/Card'

const ItemListContainer = (props) => {
	return (
		<div>
			<h3>{props.greeting}</h3>
			<MediaCard />
		</div>
	)
}

export default ItemListContainer

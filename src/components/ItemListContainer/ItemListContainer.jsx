import { Container } from '@material-ui/core';
import { Box } from '@material-ui/system';
import React from 'react'
import ItemList from '../ItemList/ItemList'

const ItemListContainer = ({greeting, initial, stock, addToCardWidget, productos}) => {
	return (
		<Container>
			<Box m={4}>
				<h3>{greeting}</h3>
				<ItemList
				initial={initial}
				stock={stock}
				addToCardWidget={addToCardWidget}
				/>
			</Box>
		</Container>
		);
}

export default ItemListContainer

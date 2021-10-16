import { Typography, Container } from '@material-ui/core'
import React from 'react'
import { useParams } from 'react-router'
import ItemList from '../ItemList/ItemList'

const ItemListContainer = () => {
	const {category} = useParams()
	console.log(category);

	return (
		<>
			<Typography variant={"h4"}>Lista de Productos</Typography>
			<ItemList />
			</>
	)
}

export default ItemListContainer

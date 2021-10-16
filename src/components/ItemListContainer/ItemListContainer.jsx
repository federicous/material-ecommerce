import { Typography, Container } from '@material-ui/core'
import React from 'react'
import ItemList from '../ItemList/ItemList'

const ItemListContainer = () => {
	return (
		<>
		<Container sx={{
			marginTop:"80px",
			display:"flex", 
			flexDirection:"row",
			justifyContent:"center",
			}}>
			<Typography variant={"h4"}>Lista de Productos</Typography>
		</Container>
			<ItemList />
			</>
	)
}

export default ItemListContainer

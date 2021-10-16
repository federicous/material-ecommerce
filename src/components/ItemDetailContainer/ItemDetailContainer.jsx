import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Container, Grid, Typography } from '@material-ui/core';
import ItemDetail from '../ItemDetail/ItemDetail';
import { useParams } from 'react-router';

const ItemDetailContainer = ({initial, addToCardWidget}) => {

	const {sku} = useParams()
	console.log(sku);

	const [products, setProducts] = useState([])
    
	const getProducts = async () => {
		try {
			// const respuesta= await axios.get(`https://api.bestbuy.com/v1/products(modelNumber=${sku.sku}&(categoryPath.id=abcat0502000))?apiKey=zIORAv06W1eGJM2Drgksm7Ku&format=json`)
			const respuesta= await axios.get(`https://api.bestbuy.com/v1/products(sku=${sku}&(categoryPath.id=abcat0502000))?apiKey=zIORAv06W1eGJM2Drgksm7Ku&format=json`)
			setProducts(respuesta.data.products)			
		} catch (error) {
			console.log(error);
		}
	}	

	useEffect(() => {
	    	getProducts()
	}, [])


	return (
		<Container sx={{
			marginTop:"80px",
			display:"flex", 
			flexDirection:"column",
			justifyContent:"center",
			}}>
			<Typography variant={"h4"}>Detalles del Producto</Typography>
	
			<Grid container spacing={2}>
			{ products && products.map((item) => (
					<Grid item key={item.sku} xs={12} sm={4} md={3}>
						<ItemDetail
						key={item.sku}
						initial={initial} 
						name={`${item.manufacturer}`}
						description={item.name}
						img={item.image}
						stock={item.quantityLimit} 
						price={item.regularPrice}
						addToCardWidget={addToCardWidget}
						/>
					</Grid>
					)
				)
			}
			</Grid>	
		</Container>
	)
}

export default ItemDetailContainer

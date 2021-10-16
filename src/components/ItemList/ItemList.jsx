import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Container, Grid } from '@material-ui/core';
import Item from '../Item/Item';

const ItemList = ({initial, addToCardWidget}) => {

	const [products, setProducts] = useState([])
    
	const getProducts = async () => {
		try {
			const respuesta= await axios.get("https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))?apiKey=zIORAv06W1eGJM2Drgksm7Ku&format=json")
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
			marginTop:"10px",
			display:"flex", 
			flexDirection:"row",
			justifyContent:"space-between",
			flexWrap: "wrap"
			}}>
			<Grid container spacing={2}>
			{ products && products.map((item) => (
					<Grid item key={item.sku} xs={12} sm={4} md={3}>
						<Item
						sku={item.sku}
						model={item.modelNumber}
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

export default ItemList

import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Typography, Grid } from '@material-ui/core';
import Item from '../Item/Item';
import { useParams } from 'react-router';
import { getFirestore } from '../../services/getFirebase';

const ItemList = ({initial, addToCardWidget}) => {
	const {category} = useParams()
	const [products, setProducts] = useState([])
    

	// const getProducts = async () => {
	// 	try {
	// 		const respuesta= await axios.get(`https://api.bestbuy.com/v1/products((categoryPath.id=${category}))?apiKey=zIORAv06W1eGJM2Drgksm7Ku&format=json`)
	// 		console.log(`https://api.bestbuy.com/v1/products((categoryPath.id=${category}))?apiKey=zIORAv06W1eGJM2Drgksm7Ku&format=json`);
	// 		console.log(respuesta);
	// 		setProducts(respuesta.data.products)			
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }	

	useEffect(() => {
	    	// getProducts()
		
		const db = getFirestore()
		db.collection('Items').where('categoryId', '==', category).get()
		.then(respuesta => setProducts(respuesta.docs.map(item=>({id: item.id, ...item.data()}))))
		console.log(products);
		


	}, [category])


	return (
		<>
			<Grid container spacing={2} sx={{marginTop:"0.1rem"}}>
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
		</>
	)
}

export default ItemList

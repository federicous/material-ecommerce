import React, { useState, useEffect } from 'react'
import { api } from '../utils/api'
import { api2 } from '../utils/api2'
import axios from "axios";
import { Container } from '@material-ui/core';
import Item from '../Item/Item';

const ItemDetailContainer = ({initial, addToCardWidget}) => {

	// const endpoint = 'sites/MLA/search?q=ipod';
	const [products, setProducts] = useState([])
	// const [loading, setLoading] = useState(true)
    
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
		    console.log(products);
		// setTimeout(() => {
		//     setLoading(false)
		// }, 2000)
	}, [])


	return (
		<div>
		<Container sx={{
			display:"flex", 
			flexDirection:"row",
			justifyContent:"space-between",
			flexWrap: "wrap"
			}}>
		{ products && products.map((item) => (
				<Item
				key={item.sku}
				initial={initial} 
				name={`${item.manufacturer} ${item.modelNumber}`}
				description={item.name}
				img={item.image}
				stock={item.stock} 
				addToCardWidget={addToCardWidget}
				/>
		)
			
			)
		}	
		</Container>
		</div>
	)
}

export default ItemDetailContainer

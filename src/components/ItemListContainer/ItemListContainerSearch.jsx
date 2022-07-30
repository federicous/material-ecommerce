
import ItemList from '../ItemList/ItemList'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { getFirestore } from '../../services/getFirebase';
import { Typography } from '@material-ui/core'
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const ItemListContainer = () => {

	const {patron} = useParams()
	const [products, setProducts] = useState([])
    
	// useEffect(() => {
	// 	const db = getFirestore()
	// 	db.collection('Items').where('categoryId', '==', category).get()
	// 	.then(respuesta => setProducts(respuesta.docs.map(item=>({id: item.id, ...item.data()}))))
	// }, [category])

	const token = cookies.get("token");
	
	useEffect(() => {
		const configuration = {
			method: "get",
			url: `/api/search/${patron}`,
			headers: {
			  Authorization: `Bearer ${token}`,
			},
		      };
		    
		      // make the API call
		      axios(configuration)
			.then((result) => {
				console.log(result.data);
				setProducts([...result.data])
			})
			.catch((error) => {
			  error = new Error();
			})

		// const db = getFirestore()
		// db.collection('Items').where('categoryId', '==', category).get()
		// .then(respuesta => setProducts(respuesta.docs.map(item=>({id: item.id, ...item.data()}))))
	}, [patron])

	return (
		<>
		<Typography variant='h5'>Busqueda: "{patron}"</Typography>
			<ItemList products={products} />
		</>
	)
}

export default ItemListContainer

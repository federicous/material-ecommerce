import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core';
import ItemDetail from '../ItemDetail/ItemDetail';
import { useParams } from 'react-router';
import { getFirestore } from '../../services/getFirebase';

const ItemDetailContainer = ({initial}) => {

	const {sku} = useParams()
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		    const db = getFirestore()
		    db.collection('Items').where('sku', '==', parseInt(sku)).get()
		    .then(respuesta => setProducts(respuesta.docs.map(item=>({id: item.id, ...item.data()}))))
		    .then(setLoading(false))
		    .catch()
		    console.log(products);
	}, [sku])

	return (
		<>
		{loading ? (
		<h1>loading...</h1>
		):(

		<Grid sx={{
			display:"flex", 
			flexDirection:"column",
     			alignItems:"center",
			justifyContent:"center",
			}} container spacing={2}>
			{ products && products.map((item) => (
					<Grid item key={item.sku} xs={12} sm={4} md={3}>
						<ItemDetail
						product={item}
						sku={item.sku}
						initial={initial} 
						name={`${item.manufacturer}`}
						model={item.modelNumber}
						description={item.name}
						img={item.image}
						stock={item.quantityLimit} 
						price={item.regularPrice}
						/>
					</Grid>
					)
				)
			}
			</Grid>			
		)}
		</>
	)
}

export default ItemDetailContainer

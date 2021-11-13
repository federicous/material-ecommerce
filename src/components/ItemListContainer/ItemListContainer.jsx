
import ItemList from '../ItemList/ItemList'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { getFirestore } from '../../services/getFirebase';

const ItemListContainer = () => {

	const {category} = useParams()
	const [products, setProducts] = useState([])
    
	useEffect(() => {
		const db = getFirestore()
		db.collection('Items').where('categoryId', '==', category).get()
		.then(respuesta => setProducts(respuesta.docs.map(item=>({id: item.id, ...item.data()}))))
	}, [category])

	return (
		<>
			<ItemList products={products} />
		</>
	)
}

export default ItemListContainer

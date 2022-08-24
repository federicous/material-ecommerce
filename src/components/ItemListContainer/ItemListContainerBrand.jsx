
import ItemList from '../ItemList/ItemList'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { Typography, Box, Pagination, Stack } from '@material-ui/core'
import axios from "axios";
import {config} from "../../config/config"
import Cookies from "universal-cookie";

const cookies = new Cookies();

const ItemListContainer = () => {

	const {category,lista} = useParams()
	const [products, setProducts] = useState([])
	const [page, setPage] = React.useState(1);
	let pageSize = 12;
	const [pagesCant, setPagesCant] = useState(10)

	const handleChange = (event, value) => {
		setPage(value);
	      };

	const token = cookies.get("token");

	// let lista = "bremen"
	
	useEffect(() => {
		let cancel = false;
		const configuration = {
			method: "get",
			// url: `${config.SERVER}/api/products/category/${category}?page=${page}&pageSize=${pageSize}`,
			url: `${config.SERVER}/api/products/${lista}/category/${category}?page=${page}&pageSize=${pageSize}`,
			headers: {
			  Authorization: `Bearer ${token}`,
			},
			withCredentials: true,
		      };
		      // make the API call
		      axios(configuration)
			.then((result) => {
				if (cancel) return;
				setProducts([...result.data.allProducts])
				setPagesCant(Math.ceil(result.data.total/pageSize))
			})
			.catch((error) => {
			  error = new Error();
			})
			return () => { 
				cancel = true;
			      }
	}, [category, page])

	return (
		<>
		<Typography variant='h5'>{category}</Typography>
			<ItemList products={products} />
			<Box sx={{my:2}}>
				<Stack spacing={2}>
					{/* <Typography>Page: {page}</Typography> */}
					<Pagination count={pagesCant} page={page} onChange={handleChange} />
				</Stack>
      			</Box>
		</>
	)
}

export default ItemListContainer

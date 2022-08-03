
import ItemList from '../ItemList/ItemList'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { Typography, Box, Pagination, Stack } from '@material-ui/core'
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const ItemListContainer = () => {

	const {category} = useParams()
	const [products, setProducts] = useState([])
	const [page, setPage] = React.useState(1);
	let pageSize = 10;
	const [pagesCant, setPagesCant] = useState(10)

	const handleChange = (event, value) => {
		setPage(value);
	      };

	const token = cookies.get("token");
	
	useEffect(() => {
		const configuration = {
			method: "get",
			url: `/api/products/category/${category}?page=${page}&pageSize=${pageSize}`,
			headers: {
			  Authorization: `Bearer ${token}`,
			},
		      };
		      // make the API call
		      axios(configuration)
			.then((result) => {
				setProducts([...result.data.allProducts])
				setPagesCant(Math.ceil(result.data.total/pageSize))
			})
			.catch((error) => {
			  error = new Error();
			})
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

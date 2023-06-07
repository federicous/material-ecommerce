
import ItemList from '../ItemList/ItemList'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { Typography, Box, Pagination, Stack, Backdrop, CircularProgress  } from '@material-ui/core'
import axios from "axios";
// import {config} from "../../config/config"
import {config} from "../../config/config"
import Cookies from "universal-cookie";

const cookies = new Cookies();

const ItemListContainer = () => {

	// const {category, brand} = useParams()
	const [products, setProducts] = useState([])
	const [page, setPage] = React.useState(1);
	let pageSize = 12;
	const [pagesCant, setPagesCant] = useState(10)
	const [errorMessage, setErrorMessage] = useState(false);
	// Backdrop or Loading spinner 
	const [open, setOpen] = useState(false);
	const handleClose = () => {
	  setOpen(false);
	};
      

	const handleChange = (event, value) => {
		setPage(value);
	      };

	const token = cookies.get("token");

	// let lista = "bremen"
	
	/* reseteo a pagina 1 cuando cambia la categoria */
	useEffect(() => {
		setPage(1)
	      }, [])


	useEffect(() => {
		let cancel = false;
		setOpen(true)
		const configuration = {
			method: "get",
			// url: `${config.SERVER}/api/products/category/${category}?page=${page}&pageSize=${pageSize}`,
			url: `${config.SERVER}/api/novedades`,
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
				setOpen(false)
			})
			.catch((error) => {
				setErrorMessage(true)
				setOpen(false)
			  	error = new Error();
			})
			return () => { 
				cancel = true;
			      }
	}, [page])

	return (
		<>
		<Typography variant='h5'>{"novedades".toUpperCase()}</Typography>
		<ItemList products={products} />
		<Box sx={{my:2}}>
			<Stack spacing={2}>
				{/* <Typography>Page: {page}</Typography> */}
				<Pagination count={pagesCant} page={page} onChange={handleChange} />
			</Stack>
		</Box>
		<Backdrop
			sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
			open={open}
			onClick={handleClose}
			>
			<CircularProgress color="inherit" />
		</Backdrop>
		</>
	)
}

export default ItemListContainer

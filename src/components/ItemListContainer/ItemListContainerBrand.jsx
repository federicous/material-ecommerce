
import ItemList from '../ItemList/ItemList'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { Typography, Box, Pagination, Stack, Backdrop, CircularProgress, Skeleton, Grid, Card, CardContent } from '@material-ui/core'
import axios from "axios";
// import {config} from "../../config/config"
import {config} from "../../config/config"
import Cookies from "universal-cookie";

const cookies = new Cookies();

const ItemListContainer = () => {

	const {category, brand} = useParams()
	const [products, setProducts] = useState([])
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState(false);
	const [initialLoad, setInitialLoad] = useState(true);
	const pageSize = 12;

	const [errorMessage, setErrorMessage] = useState(false);
	// Backdrop or Loading spinner 
	const [open, setOpen] = useState(false);
	const handleClose = () => {
	  setOpen(false);
	};
      
	const observer = React.useRef();

	const lastElementRef = React.useCallback(node => {
		if (loading) return;
		if (observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && hasMore) {
				setPage(prevPage => prevPage + 1);
			}
		});
		if (node) observer.current.observe(node);
	}, [loading, hasMore]);

	const token = cookies.get("token");

	// Reset 
	useEffect(() => {
		setPage(1);
		setProducts([]);
		setHasMore(true);
		setInitialLoad(true);
	}, [category, brand])


	useEffect(() => {
		let cancel = false;
		setLoading(true);

		const configuration = {
			method: "get",
			url: `${config.SERVER}/api/products/brand/${brand}?page=${page}&pageSize=${pageSize}`,
			headers: {
			  Authorization: `Bearer ${token}`,
			},
			withCredentials: true,
		      };
		      // make the API call
		      axios(configuration)
			.then((result) => {
				if (cancel) return;
				const newProducts = result.data.allProducts;
				const total = result.data.total;

				setProducts(prev => {
					return page === 1 ? newProducts : [...prev, ...newProducts];
				});
				
				const totalPages = Math.ceil(total / pageSize);
				if (page >= totalPages) {
					setHasMore(false);
				}
				
				setLoading(false);
				setInitialLoad(false);
			})
			.catch((error) => {
				setErrorMessage(true)
				setLoading(false);
				setInitialLoad(false);
			  	error = new Error();
			})
			return () => { 
				cancel = true;
			      }
	}, [category, brand, page])

	return (
		<>
		<Typography variant='h5'>{brand.toUpperCase()}</Typography>

		{initialLoad && page === 1 ? (
			<Box display="flex" justifyContent="center" mt="30vh">
				<CircularProgress />
			</Box>
		) : (
			<>
				<ItemList products={products} />
				
				{/* Sentinel for Infinite Scroll */}
				{!loading && hasMore && <div ref={lastElementRef} style={{ height: '20px', margin: '10px 0' }} />}
				
				{/* Bottom Loader */}
				{loading && page > 1 && (
					<Box display="flex" justifyContent="center" my={4}>
						<CircularProgress disableShrink />
					</Box>
				)}
				
				{!hasMore && products.length > 0 && (
					<Box display="flex" justifyContent="center" my={2}>
						<Typography variant="body2" color="textSecondary">No hay más productos</Typography>
					</Box>
				)}
			</>
		)}
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

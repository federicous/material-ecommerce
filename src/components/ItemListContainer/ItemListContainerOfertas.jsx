import ItemList from '../ItemList/ItemList'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { Typography, Box, Pagination, Stack, Backdrop, CircularProgress, Button, Drawer, Grid } from '@material-ui/core'
import axios from "axios";
// import {config} from "../../config/config"
import {config} from "../../config/config"
import Cookies from "universal-cookie";
import ProductFilters from '../ProductFilters/ProductFilters';
import FilterListIcon from '@material-ui/icons/FilterList';

const cookies = new Cookies();

const ItemListContainer = () => {

	// const {category, brand} = useParams()
	const [products, setProducts] = useState([])
	const [filteredProducts, setFilteredProducts] = useState([])
	const [page, setPage] = React.useState(1);
	let pageSize = 12;
	const [pagesCant, setPagesCant] = useState(10)
	const [errorMessage, setErrorMessage] = useState(false);
	// Backdrop or Loading spinner 
	const [open, setOpen] = useState(false);
	
	// Filter state
	const [filters, setFilters] = useState({ lista: [], label: [] });
	const [filterOpen, setFilterOpen] = useState(false);

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
			url: `${config.SERVER}/api/ofertas`,
			headers: {
			  Authorization: `Bearer ${token}`,
			},
			withCredentials: true,
		      };
		      // make the API call
		      axios(configuration)
			.then((result) => {
				if (cancel) return;
				const allProducts = result.data.allProducts;
				setProducts([...allProducts])
				// Default behavior checks filters in subsequent effect
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

	// Filtering Effect
	useEffect(() => {
		let filtered = products;

		if (filters.lista && filters.lista.length > 0) {
			filtered = filtered.filter(product => filters.lista.includes(product.lista));
		}

		if (filters.label && filters.label.length > 0) {
			filtered = filtered.filter(product => filters.label.includes(product.label));
		}

		setFilteredProducts(filtered);
	}, [products, filters]);

	const toggleFilterDrawer = (open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
		  return;
		}
		setFilterOpen(open);
	};

	return (
		<>
		<Box style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: '16px', width: '100%' }}>
			<Typography variant='h5'>{"ofertas".toUpperCase()}</Typography>
			<Button 
				variant="outlined" 
				startIcon={<FilterListIcon />} 
				onClick={toggleFilterDrawer(true)}
			>
				Filtrar
			</Button>
		</Box>

		<Drawer
			anchor="right"
			open={filterOpen}
			onClose={toggleFilterDrawer(false)}
		>
			<Box
				width={300} p={2}
				role="presentation"
			>
				<ProductFilters 
					products={products} 
					filters={filters} 
					onChange={setFilters} 
				/>
				<Box display="flex" justifyContent="flex-end" mt={2}>
					<Button variant="contained" color="primary" onClick={toggleFilterDrawer(false)}>
						Ver Resultados
					</Button>
				</Box>
			</Box>
		</Drawer>

		<ItemList products={filteredProducts} />
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

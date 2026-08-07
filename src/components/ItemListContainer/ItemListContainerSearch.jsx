import ItemList from '../ItemList/ItemList'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
// import { getFirestore } from '../../services/getFirebase';
import { Typography, Box, Pagination, Stack, CircularProgress, Button, Drawer, Grid, Skeleton, Card, CardContent } from '@material-ui/core'
import axios from "axios";
// import {config} from "../../config/config"
import {config} from "../../config/config"
import Cookies from "universal-cookie";
import ProductFilters from '../ProductFilters/ProductFilters';
import FilterListIcon from '@material-ui/icons/FilterList';

const cookies = new Cookies();

const ItemListContainer = () => {

	const {patron} = useParams()
	const [products, setProducts] = useState([])
	const [filteredProducts, setFilteredProducts] = useState([])
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState(false);
	const [initialLoad, setInitialLoad] = useState(true);
	const pageSize = 12;
	
	const [errorMessage, setErrorMessage] = useState(false);
	
	// Filter state
	const [filters, setFilters] = useState({ lista: [], label: [] });
	const [filterOpen, setFilterOpen] = useState(false);

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

	// Reset on search change
	useEffect(() => {
		setPage(1);
		setProducts([]);
		setHasMore(true);
		setInitialLoad(true);
	}, [patron]);

	useEffect(() => {
		let cancel = false;
		if (!patron || patron.trim().length < 3) {
			setProducts([]);
			setLoading(false);
			setInitialLoad(false);
			return;
		}
		setLoading(true);
		
		const configuration = {
			method: "get",
			url: `${config.SERVER}/api/search/${patron}?page=${page}&pageSize=${pageSize}`,
			headers: {
			  Authorization: `Bearer ${token}`,
			},
			withCredentials: true,
		      };
		      
		      axios(configuration)
			.then((result) => {
				if (cancel) return;
				const newProducts = result.data.allProducts;
				const total = result.data.total;
				
				setProducts(prev => {
					// Detect if we are appending or replacing (based on page for safety, or just logic)
					// If page is 1, replace. Else append.
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
			})
			return () => { 
				cancel = true;
			}
	}, [patron, page]);
	
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

	// Ref for auto-scroll
	const loaderRef = React.useRef(null);
	
	// Auto-scroll effect
	useEffect(() => {
		if (loading && page > 1 && loaderRef.current) {
			loaderRef.current.scrollIntoView({ behavior: 'auto', block: 'center' });
		}
	}, [loading, page]);

	return (
		<>
		<Box style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: '16px', width: '100%' }}>
			<Typography variant='h5'>Busqueda: "{patron}"</Typography>
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

		{initialLoad && page === 1 ? (
			<Box sx={{ display: 'flex', mt:"30vh", height:"100%", justifyContent: 'center' }}>
				<CircularProgress />
			</Box>
		) : (
			<>
				<ItemList products={filteredProducts} />
				
				{/* Sentinel for Infinite Scroll */}
				{!loading && hasMore && <div ref={lastElementRef} style={{ height: '200px', margin: '10px 0' }} />}
				
				{/* Bottom Loader */}
				{loading && page > 1 && (
					<Box display="flex" flexDirection="column" alignItems="center" my={4} ref={loaderRef}>
						<CircularProgress disableShrink/>
						<Box sx={{ height: 200 }} /> {/* Spacer for better scroll visibility */}
					</Box>
				)}
				
				{!hasMore && products.length > 0 && (
					<Box display="flex" justifyContent="center" my={2}>
						<Typography variant="body2" color="textSecondary">No hay más productos</Typography>
					</Box>
				)}
			</>
		)}
		</>
	)
}

export default ItemListContainer

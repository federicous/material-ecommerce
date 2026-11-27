import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Typography, Box, CircularProgress, Button, Drawer } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import ItemList from '../ItemList/ItemList';
import ProductFilters from '../ProductFilters/ProductFilters';
import useProductPages from './useProductPages';

export function SearchResults({ term, inDrawer = false }) {
  const { products, status, page, hasMore, sentinel } = useProductPages(term.length >= 3 ? `/api/search/${encodeURIComponent(term)}` : null);
  const [filters, setFilters] = useState({ lista: [], label: [] });
  const [filterOpen, setFilterOpen] = useState(false);
  const filteredProducts = products.filter(product =>
    (!filters.lista.length || filters.lista.includes(product.lista)) &&
    (!filters.label.length || filters.label.includes(product.label))
  );

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: inDrawer ? 'flex-end' : 'space-evenly', alignItems: 'center', mb: 2, width: '100%' }}>
        {!inDrawer && <Typography variant="h5">Busqueda: "{term}"</Typography>}
        <Button
          variant="outlined"
          size={inDrawer ? 'small' : 'medium'}
          startIcon={<FilterListIcon />}
          onClick={() => setFilterOpen(true)}
        >
          Filtrar
        </Button>
      </Box>

      <Drawer anchor="right" open={filterOpen} onClose={() => setFilterOpen(false)}>
        <Box width={300} p={2} role="presentation">
          <ProductFilters products={products} filters={filters} onChange={setFilters} />
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button variant="contained" color="primary" onClick={() => setFilterOpen(false)}>
              Ver Resultados
            </Button>
          </Box>
        </Box>
      </Drawer>

      {products.length > 0 && <ItemList products={filteredProducts} />}

      {status === 'loading' && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: page === 1 ? '30vh' : 4 }}>
          <CircularProgress aria-label="Cargando resultados" />
        </Box>
      )}
      {status === 'error' && (
        <Typography role="alert">
          {page === 1
            ? 'No se pudo completar la búsqueda. Probá con otro término.'
            : 'No se pudieron cargar más resultados.'}
        </Typography>
      )}
      {status === 'success' && (
        <>
          {products.length === 0 && <Typography>Sin resultados</Typography>}
          {hasMore && <div ref={sentinel} style={{ height: '20px', margin: '10px 0' }} />}
          {!hasMore && products.length > 0 && (
            <Box display="flex" justifyContent="center" my={2}>
              <Typography variant="body2" color="textSecondary">No hay más productos</Typography>
            </Box>
          )}
        </>
      )}
    </>
  );
}

export default function ItemListContainerSearch() {
  const { patron } = useParams();
  const term = patron?.trim() || '';
  return <SearchResults key={term} term={term} />;
}

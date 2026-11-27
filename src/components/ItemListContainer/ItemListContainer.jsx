import React from 'react';
import { useParams } from 'react-router';
import { Typography, Box, CircularProgress } from '@material-ui/core';
import ItemList from '../ItemList/ItemList';
import useProductPages from './useProductPages';

function CategoryResults({ category, endpoint }) {
  const { products, status, page, hasMore, sentinel } = useProductPages(endpoint);

  return (
    <>
      <Typography variant="h5">{category}</Typography>

      {products.length > 0 && <ItemList products={products} />}

      {status === 'loading' && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: page === 1 ? '30vh' : 4 }}>
          <CircularProgress aria-label="Cargando productos" />
        </Box>
      )}
      {status === 'error' && (
        <Typography role="alert">
          {page === 1
            ? 'No se pudieron cargar los productos de esta categoría.'
            : 'No se pudieron cargar más productos.'}
        </Typography>
      )}
      {status === 'success' && (
        <>
          {products.length === 0 && <Typography>Sin productos en esta categoría</Typography>}
          {hasMore && <div ref={sentinel} style={{ height: '20px', margin: '10px 0' }} />}
          {!hasMore && products.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <Typography variant="body2" color="textSecondary">No hay más productos</Typography>
            </Box>
          )}
        </>
      )}
    </>
  );
}

export default function ItemListContainer() {
  const { category, lista } = useParams();
  const brandPath = lista ? `/${encodeURIComponent(lista)}` : '';
  const endpoint = `/api/products${brandPath}/category/${encodeURIComponent(category)}`;
  return <CategoryResults key={endpoint} category={category} endpoint={endpoint} />;
}

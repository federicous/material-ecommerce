import React from 'react';
import { useParams } from 'react-router';
import { useTheme } from '@material-ui/core/styles';
import BusquedaDrawer from '../Busqueda/BusquedaDrawer';
import BusquedaDrawerWhite from '../Busqueda/BusquedaDrawerWhite';
import { SearchResults } from './ItemListContainerSearch';

export default function ItemListContainerSearchDrawer() {
  const theme = useTheme();
  const { patron } = useParams();
  const term = patron?.trim() || '';

  return (
    <>
      {theme.palette.mode === 'dark' ? <BusquedaDrawer /> : <BusquedaDrawerWhite />}
      <SearchResults key={term} term={term} inDrawer />
    </>
  );
}

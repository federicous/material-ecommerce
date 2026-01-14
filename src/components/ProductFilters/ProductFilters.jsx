import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
  FormControlLabel,
  Paper,
  Box
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

/**
 * ProductFilters Component
 * 
 * @param {Array} products - Original list of products to extract available filters from
 * @param {Array} selectedBrands - Currently selected brands
 * @param {Function} onChange - Callback function (newSelectedBrands) => void
 * @returns 
 */
const ProductFilters = ({ products, filters, onChange }) => {
  const [availableBrands, setAvailableBrands] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);

  // Extract unique filters from products
  useEffect(() => {
    if (!products) return;

    // Extract brands (lista)
    const brands = [...new Set(products.map(p => p.lista).filter(Boolean))].sort();
    setAvailableBrands(brands);

    // Extract categories (label)
    const categories = [...new Set(products.map(p => p.label).filter(Boolean))].sort();
    setAvailableCategories(categories);
    
  }, [products]);

  const handleFilterChange = (type, value) => {
    const currentSelection = filters[type] || [];
    let newSelection;

    if (currentSelection.includes(value)) {
        newSelection = currentSelection.filter(item => item !== value);
    } else {
        newSelection = [...currentSelection, value];
    }

    onChange({
        ...filters,
        [type]: newSelection
    });
  };

  if (availableBrands.length === 0 && availableCategories.length === 0) {
    return null;
  }

  return (
    <Box width="100%" mb={2}>
      <Box p={2} borderBottom={1} borderColor="divider">
        <Typography variant="h6">Filtros</Typography>
      </Box>
      
      {/* Brands Filter */}
      {availableBrands.length > 0 && (
        <Accordion defaultExpanded elevation={0}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">Marca</Typography>
            </AccordionSummary>
            <AccordionDetails style={{ flexDirection: 'column', paddingTop: 0 }}>
            {availableBrands.map((brand) => (
                <FormControlLabel
                key={brand}
                control={
                    <Checkbox
                    checked={filters.lista?.includes(brand) || false}
                    onChange={() => handleFilterChange('lista', brand)}
                    color="primary"
                    size="small"
                    />
                }
                label={<Typography variant="body2" style={{ textTransform: 'capitalize' }}>{brand}</Typography>}
                />
            ))}
            </AccordionDetails>
        </Accordion>
      )}

      {/* Categories Filter */}
      {availableCategories.length > 0 && (
        <Accordion defaultExpanded elevation={0}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">Categoría</Typography>
            </AccordionSummary>
            <AccordionDetails style={{ flexDirection: 'column', paddingTop: 0 }}>
            {availableCategories.map((cat) => (
                <FormControlLabel
                key={cat}
                control={
                    <Checkbox
                    checked={filters.label?.includes(cat) || false}
                    onChange={() => handleFilterChange('label', cat)}
                    color="primary"
                    size="small"
                    />
                }
                label={<Typography variant="body2" style={{ textTransform: 'capitalize' }}>{cat}</Typography>}
                />
            ))}
            </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
};

export default ProductFilters;

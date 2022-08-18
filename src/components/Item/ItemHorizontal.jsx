import React from 'react'
import { Card,CardActions,CardContent,CardMedia,Container,Typography,Box, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { fontSize } from '@material-ui/system';
import ItemCountHorizontal from '../ItemCount/ItemCountHorizontal'
import {config} from "../../config/config";

function capitalizeFirstLetter(string) {
  let cadena = string.toLowerCase()
  return cadena.charAt(0).toUpperCase() + cadena.slice(1);
}

const Item = ({product, name, description, img, stock, model,sku, price}) => {
	return (
    <>
  <Box>
  <Card sx={{ display: 'flex', width:"100%" }}>
    <CardMedia component="img" image={`${config.SERVER}/images/${img ? img : "sin_imagen.jpg"}`} sx={{minHeight:"90px", minWidth:"80px"}} alt="sin imagen" />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5" sx={{fontSize:{xs:"x-small",sm:"small",md:"medium"}}}>
            {capitalizeFirstLetter(name)}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" sx={{fontSize:{xs:"x-small",sm:"small",md:"medium"}}}>
          {capitalizeFirstLetter(model)}
          </Typography>
          <Link to={`/detail/${sku}`}>
            <Typography sx={{fontSize:{xs:"x-small",sm:"small"}}}  variant="caption" color="text.secondary">
              Código: {description}
            </Typography>
            <Typography sx={{ fontWeight: "bold", textDecoration: "none", color:"text.primary" }} variant="h6">
            $ {price}
          </Typography>
          </Link>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
        <ItemCountHorizontal
            product={product}
            initial={1}
            stock={stock}
          />
        </Box>
      </Box>

    </Card>
  </Box>


    </>
  );
}

export default Item

import React from 'react'
import { Card,CardActions,CardContent,CardMedia,Container,Typography,Box, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { fontSize } from '@material-ui/system';
import ItemCount2 from '../ItemCount/ItemCount2'
import {config} from "../../config/config";

function capitalizeFirstLetter(string) {
  let cadena = string.toLowerCase()
  return cadena.charAt(0).toUpperCase() + cadena.slice(1);
}

const Item = ({product, name, description, img, stock, model,sku, price}) => {
	return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          paddingY: "20px",
        }}
      >
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link to={`/detail/${sku}`}>
            <CardMedia component="img" image={`${config.SERVER}/images/${img ? img : "sin_imagen.jpg"}`} sx={{height:{xs:"150px",sm:"200px"}, width:"100%", objectFit:"cover"}} alt="sin imagen" />
          </Link>
        </Container>
        <CardContent sx={{ margin: 0,p:{xs:1,md:2} }}>
          <Typography gutterBottom sx={{fontSize:{xs:"xsmall",sm:"small",md:"medium"}}}  variant="body" component="div">
            {capitalizeFirstLetter(name)}
          </Typography>
          <Typography gutterBottom sx={{fontSize:{xs:"xsmall",sm:"small",md:"medium"}}}  variant="body2" color="text.secondary" component="div">
            {capitalizeFirstLetter(model)}
          </Typography>
          <Link to={`/detail/${sku}`}>
            <Typography  variant="caption" color="text.secondary">
              Código: {description}
            </Typography>
            <Typography sx={{ fontWeight: "bold", textDecoration: "none", color:"text.primary" }} variant="h6">
            $ {price}
          </Typography>
          </Link>
        </CardContent>
        <CardActions
          sx={{
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="caption">(Stock: {stock})</Typography>
          <Box>
            {/* <Link to={`/detail/${sku}`} style={{ textDecoration:"none", color:"inherit"}}>
              <Button
                size="medium"
                variant="contained"
                color="success"
                sx={{ fontSize:{xs:"xsmall",sm:"small",md:"medium"}, width: "100%" }}
              >
               <Typography sx={{fontSize:{xs:"xsmall",sm:"small"}}} variant="caption">Detalles</Typography>

              </Button>
            </Link> */}
            <ItemCount2
            product={product}
            initial={1}
            stock={stock}
          />
          </Box>
        </CardActions>
      </Card>
    </>
  );
}

export default Item

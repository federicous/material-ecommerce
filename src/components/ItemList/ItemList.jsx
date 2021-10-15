import React from 'react'
import { Card,CardActions,CardContent,CardMedia,Container,Typography,Box, Button } from '@material-ui/core';
import ItemCount from '../ItemCount/ItemCount'
import { Link } from 'react-router-dom';

const ItemList = ({initial, name, description, img, stock, price, addToCardWidget, model,sku}) => {
	console.log(sku);
	return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          paddingY:"20px"
        }}
      >
        <Container
          sx={{
            // height:"280px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Link to={`/detail/${sku}`}>
          <CardMedia component="img" image={img} alt="notebook" />
	  </Link> 
        </Container>
        <CardContent sx={{ margin: "0" }}>
          <Typography gutterBottom variant="h6" component="div">
            {name}
          </Typography>
          <Link to={`/detail/${sku}`}>
	  <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
	  </Link> 
        </CardContent>
        <CardActions
          sx={{
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="body2">(Stock: {stock})</Typography>
	  <Box>
          <Link to={`/detail/${sku}`}>
			<Button size="medium" variant="contained" color="success"  sx={{ fontSize: 12, width:"100%" }}
			>Detalles</Button>
		</Link>
		</Box>
        </CardActions>
      </Card>
    </>
  );
}

export default ItemList

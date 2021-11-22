import React from 'react'
import { Card,CardActions,CardContent,CardMedia,Container,Typography } from '@material-ui/core';
import ItemCount from '../ItemCount/ItemCount'

const Item = ({initial, name, model, description, img, stock, price, product}) => {
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
            display: "flex",
            alignItems: "center",
          }}
        >
          <CardMedia component="img" image={img} alt="notebook" />
        </Container>
        <CardContent sx={{ margin: "0" }}>
          <Typography gutterBottom variant="h6" component="div">
            {name}
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
            Model: {model}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }} variant="h6">
            $ {price}
          </Typography>
          <Typography variant="body2">(Stock: {stock})</Typography>
          <ItemCount
            product={product}
            initial={initial}
            stock={stock}
          />
        </CardActions>
      </Card>
    </>
  );
}

export default Item

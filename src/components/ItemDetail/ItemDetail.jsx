import React from 'react'
import { Card,CardActions,CardContent,CardMedia,Container,Typography } from '@material-ui/core';
import ItemCount from '../ItemCount/ItemCount'

const Item = ({initial, name, description, img, stock, price, addToCardWidget}) => {
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
          <CardMedia component="img" image={img} alt="notebook" />
        </Container>
        <CardContent sx={{ margin: "0" }}>
          <Typography gutterBottom variant="h6" component="div">
            {name}
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
            initial={initial}
            stock={stock}
            addToCardWidget={addToCardWidget}
          />
        </CardActions>
      </Card>
    </>
  );
}

export default Item

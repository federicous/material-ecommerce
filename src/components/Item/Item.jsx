import React from 'react'
import { Card,CardActions,CardContent,CardMedia,Container,Typography } from '@material-ui/core';
import ItemCount from '../ItemCount/ItemCount'

const Item = ({initial, name, description, img, stock, price, addToCardWidget}) => {
	return (
    <>
      <Card
        sx={{
          // maxWidth: 345,
          // width: 357,
          // height: 357,
          // height: 200,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Container sx={{
          height:"280px",
          display:"flex",
          alignItems:"center"
        }}
        >
        <CardMedia
          component="img"
          // height="240"
          // width="fit-content"
          image={img}
          alt="notebook"
        />
        </Container>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
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
          <Typography sx={{fontWeight:"bold"}} variant="h5">$ {price}</Typography>
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

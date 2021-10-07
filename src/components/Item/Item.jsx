import React from 'react'
import { Card,CardActions,CardContent,CardMedia,Typography } from '@material-ui/core';
import ItemCount from '../ItemCount/ItemCount'

const Item = ({initial, name, description, img, stock, addToCardWidget}) => {
	return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <CardMedia
          component="img"
          height="240"
          image={img}
          alt="notebook"
        />
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
          <Typography>Stock: {stock}</Typography>
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

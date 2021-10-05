import * as React from 'react';
import { Card,CardActions,CardContent,CardMedia,Button,Typography } from '@material-ui/core';
import ItemCount from '../ItemCount/ItemCount'

export default function MediaCard({stock, addToCardWidget}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="240"
        image="https://s3-sa-east-1.amazonaws.com/saasargentina/FT73bvaQY55Yhw7isnVJ/imagen"
        alt="notebook Asus"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Notebook
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Notebook ASUS X509JA Intel I3 1005 G1 | 4GB | 1Tb | 15.6 FULL HD
        </Typography>
      </CardContent>
      <CardActions>
      <ItemCount stock={stock} addToCardWidget={addToCardWidget}/>
      </CardActions>
    </Card>
  );
}

import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function MediaCard() {
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
        <Button size="small">Add</Button>
        <Button size="small">Remove</Button>
      </CardActions>
    </Card>
  );
}

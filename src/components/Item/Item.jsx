import React from 'react'
import { Card,CardActions,CardContent,CardMedia,Container,Typography,Box, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Item = ({name, description, img, stock, model,sku}) => {
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
          }}
        >
          <Link to={`/detail/${sku}`}>
            <CardMedia component="img" image={`images/${img}`} alt="notebook" />
          </Link>
        </Container>
        <CardContent sx={{ margin: "0" }}>
          <Typography gutterBottom variant="body" component="div">
            {name}
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
            Model: {model}
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
              <Button
                size="medium"
                variant="contained"
                color="success"
                sx={{ fontSize: 12, width: "100%" }}
              >
                Detalles
              </Button>
            </Link>
          </Box>
        </CardActions>
      </Card>
    </>
  );
}

export default Item

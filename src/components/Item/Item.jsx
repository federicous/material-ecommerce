import React from 'react'
import { Card,CardActions,CardContent,CardMedia,Container,Typography,Box, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { fontSize } from '@material-ui/system';

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
          <Typography gutterBottom sx={{fontSize:{xs:"xsmall",sm:"small",md:"medium"}}} variant="caption" component="div">
            {name}
          </Typography>
          <Typography gutterBottom sx={{fontSize:{xs:"xsmall",sm:"small",md:"medium"}}} variant="caption" color="text.secondary" component="div">
            {model}
          </Typography>
          <Link to={`/detail/${sku}`}>
            <Typography sx={{fontSize:{xs:"xsmall",sm:"small",md:"medium"}}} variant="caption" color="text.secondary">
              Código: {description}
            </Typography>
          </Link>
        </CardContent>
        <CardActions
          sx={{
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography sx={{fontSize:{xs:"xsmall",sm:"small",md:"medium"}}} variant="caption">(Stock: {stock})</Typography>
          <Box>
            <Link to={`/detail/${sku}`} style={{ textDecoration:"none", color:"inherit"}}>
              <Button
                size="medium"
                variant="contained"
                color="success"
                sx={{ fontSize:{xs:"xsmall",sm:"small",md:"medium"}, width: "100%" }}
              >
               <Typography sx={{fontSize:{xs:"xsmall",sm:"small"}}} variant="caption">Detalles</Typography>
              </Button>
            </Link>
          </Box>
        </CardActions>
      </Card>
    </>
  );
}

export default Item

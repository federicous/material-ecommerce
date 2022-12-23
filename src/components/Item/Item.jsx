import React from 'react'
import { Card,CardActions,CardContent,CardMedia,Container,Typography,Box, Button, Link as LinkMui } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { fontSize } from '@material-ui/system';
import ItemCount2 from '../ItemCount/ItemCount2'
// import {config} from "../../config/config";
import {config} from "../../config/config";
import { Edit as EditIcon } from '@material-ui/icons';
import ApiQuery from "../utils/apiQuery/apiQuery"
let apiQuery = new ApiQuery();

function capitalizeFirstLetter(string) {
  let cadena = string.toLowerCase()
  return cadena.charAt(0).toUpperCase() + cadena.slice(1);
}

const Item = ({product, name, description, img, stock, model,sku, price}) => {
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    apiQuery.get(`/permisos`)
    .then((respuesta)=>{
      setIsAdmin(respuesta)
    })
  }, [])
  
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
            {/* <CardMedia component="img" image={`${config.SERVER}/images/${img ? img : "sin_imagen.jpg"}`} alt="sin imagen" /> */}
            <CardMedia component="img" image={`${config.SERVER}/images/${img ? img : "sin_imagen.jpg"}`} sx={{height:{xs:"150px",sm:"200px"}, width:"100%", objectFit:"cover"}} alt="sin imagen" />
          </Link>
        </Container>
        <CardContent sx={{ margin: 0,p:{xs:1,md:2} }}>
          <Typography gutterBottom sx={{fontSize:{xs:"x-small",sm:"small",md:"medium"}}}  variant="body" component="div">
            {capitalizeFirstLetter(name)}
          </Typography>
          <Typography gutterBottom sx={{fontSize:{xs:"x-small",sm:"small",md:"medium"}}}  variant="body2" color="text.secondary" component="div">
            {capitalizeFirstLetter(model)}
          </Typography>
          <Link to={`/detail/${sku}`}>
            <Typography sx={{fontSize:{xs:"x-small",sm:"small"}}}  variant="caption" color="text.secondary">
              Código: {description}
            </Typography>
            <Typography sx={{ fontWeight: "bold", textDecoration: "none", color:"text.primary" }} variant="h6">
            {price ? `$ ${price}` : "NO DISPONIBLE" }
          </Typography>
          </Link>
          {isAdmin ? <>
              <LinkMui href={`${config.ADMINISTRADOR}/producto/${sku}`} style={{ textDecoration:"none", color:"inherit"}}>
                <Button startIcon={<EditIcon />} size="small" variant="contained" color="primary"  sx={{ fontSize: 12, mt:1}}>Editar</Button>
              </LinkMui>
            </> : <></>
          }
        </CardContent>
        <CardActions
          sx={{
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {/* <Typography sx={{fontSize:{xs:"x-small",sm:"small"}}} variant="caption">(Stock: {stock})</Typography> */}
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
            price={price}
          />
          </Box>
        </CardActions>
      </Card>
    </>
  );
}

export default Item

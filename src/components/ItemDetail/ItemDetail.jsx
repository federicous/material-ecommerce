import React from 'react'
import { Card,CardActions,CardContent,CardMedia,Container,Typography, Button, Link as LinkMui } from '@material-ui/core';
import ItemCount2 from '../ItemCount/ItemCount2'
// import {config} from "../../config/config";
import {config} from "../../config/config";
import { Edit as EditIcon } from '@material-ui/icons';
import ApiQuery from "../utils/apiQuery/apiQuery"
let apiQuery = new ApiQuery();


const Item = ({initial, name, model, description, img, stock, price, product, sku}) => {
  const [isAdmin, setIsAdmin] = React.useState(false)
  const [iva, setIva] = React.useState(0);;

  React.useEffect(() => {
    apiQuery.get(`/permisos`)
    .then((respuesta)=>{
      setIsAdmin(respuesta)
    })
  }, [])

  React.useEffect(() => {
    setIva(parseFloat(typeof product.iva === "string" ? product.iva.replace(/,/g, '.').replace(/%/g, '') : product.iva))
  }, [])

  function ccyFormat(num) {
    let numFloat = parseFloat(num)
    return `${numFloat.toFixed(2)}`;
  }

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
          <CardMedia component="img" image={`${config.SERVER}/images/${img ? img : "sin_imagen.jpg"}`} alt="sin imagen"/>
        </Container>
        <CardContent sx={{ margin: "0" }}>
          <Typography gutterBottom variant="body" component="div">
            {name}
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
            Categoría: {model}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Código: {description}
          </Typography>
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
          <Typography sx={{ fontWeight: "bold" }} variant="h6">
            {/* $ {price} */}
            {product.precioConIva ? ccyFormat(product.precioConIva/(1+iva/100)) : (price ? `$ ${ccyFormat(price)}` : "NO DISPONIBLE") }
            
          </Typography>
          {/* <Typography variant="body2">(Stock: {stock})</Typography> */}
          <ItemCount2
            product={product}
            initial={1}
            stock={stock}
            price={price}
          />
        </CardActions>
      </Card>
    </>
  );
}

export default Item

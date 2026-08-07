import React from 'react'
import { Card,CardActions,CardContent,CardMedia,Container,Typography, Button, Link as LinkMui, Badge, styled } from '@material-ui/core';
import ItemCount2 from '../ItemCount/ItemCount2'
// import {config} from "../../config/config";
import {config} from "../../config/config";
import { Edit as EditIcon } from '@material-ui/icons';
import ApiQuery from "../utils/apiQuery/apiQuery"
import { CartContext } from '../CartContext/CartContext';
let apiQuery = new ApiQuery();

function capitalizeFirstLetter(string) {
  let cadena = string.toLowerCase()
  return cadena.charAt(0).toUpperCase() + cadena.slice(1);
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 30,
    top: 1,
    // border: `2px solid ${theme.palette.background.paper}`,
    // padding: '10 4px',
  },
}));

const ItemDetail = ({initial, name, model, description, img, stock, price, product, sku, categoria}) => {
  const cartContext = React.useContext(CartContext);
  const canViewPrice = cartContext?.canViewPrice;
  const [isAdmin, setIsAdmin] = React.useState(false)
  const [iva, setIva] = React.useState(0);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const maxLength = 100;
  const [imgSrc, setImgSrc] = React.useState(`${config.SERVER}/images/${img || "sin_imagen.jpg"}`);

  const handleImageError = () => {
    setImgSrc(`${config.SERVER}/images/sin_imagen.jpg`);
  };

  React.useEffect(() => {
    setImgSrc(`${config.SERVER}/images/${img || "sin_imagen.jpg"}`);
  }, [img]);

  React.useEffect(() => {
    apiQuery.get(`/permisos/nivel`)
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

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

	return (
    <>
    <StyledBadge badgeContent={product.oferta == "si" ? "OFERTA" : 0} color="error">
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
          <CardMedia 
            component="img" 
            image={imgSrc} 
            onError={handleImageError}
            alt="sin imagen"/>
        </Container>
        <CardContent sx={{ margin: "0" }}>
          <Typography gutterBottom variant="body" component="div">
            {name.length > maxLength ? (
              <>
                {isExpanded ? capitalizeFirstLetter(name) : `${capitalizeFirstLetter(name).substring(0, maxLength)}...`}
                <Button variant="text" size="small" onClick={toggleExpanded} sx={{fontSize:"x-small"}}>
                  {isExpanded ? 'Leer menos' : 'Leer más'}
                </Button>
              </>
            ) : (
              capitalizeFirstLetter(name)
            )}
          </Typography>            
          <Typography gutterBottom sx={{fontSize:{xs:"x-small",sm:"small",md:"medium"}}}  variant="body2" color="text.secondary" component="div">
              {categoria && `${categoria}`}
            </Typography>
          <Typography gutterBottom variant="body2" component="div">
            Categoría: {model}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Código: {description}
          </Typography>
          {isAdmin ? <>
              <LinkMui href={`${config.ADMINISTRADOR}/producto/${sku}`} target="_blank" style={{ textDecoration:"none", color:"inherit"}}>
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
          <Typography sx={{ fontWeight: "bold", color: canViewPrice ? "text.primary" : "primary.main" }} variant="h6">
            {canViewPrice ? (price ? `$ ${ccyFormat(price)}` : "NO DISPONIBLE") : "Inicie sesión para ver precio"}
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
      </StyledBadge>
    </>
  );
}

export default ItemDetail
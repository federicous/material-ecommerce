import React from 'react'
import { Card,CardContent,CardMedia,Typography,Box,Button, Link as LinkMui, Badge, styled } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import ItemCountHorizontal from '../ItemCount/ItemCountHorizontal';
import { Edit as EditIcon } from '@material-ui/icons';
// import {config} from "../../config/config";
import {config} from "../../config/config";

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

const ItemHorizontal = ({product, name, description, img, stock, model,sku, price}) => {
  const cartContext = React.useContext(CartContext);
  const canViewPrice = cartContext?.canViewPrice;
  let navigate = useNavigate();
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [iva, setIva] = React.useState(0);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const maxLength = 40;
  const [imgSrc, setImgSrc] = React.useState(`${config.SERVER}/images/${img || "sin_imagen.jpg"}`);

  const handleImageError = () => {
    setImgSrc(`${config.SERVER}/images/sin_imagen.jpg`);
  };

  React.useEffect(() => {
    setImgSrc(`${config.SERVER}/images/${img || "sin_imagen.jpg"}`);
  }, [img]);

  React.useEffect(() => {
    let cancel = false;
    apiQuery.get(`/permisos/nivel`)
    .then((respuesta)=>{
      if (cancel) return;
      setIsAdmin(respuesta)
    })
    return () => { cancel = true; }
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
  <Box>
  <StyledBadge 
        badgeContent={
          product.oferta == "si" && product.novedades != "si"
            ? "OFERTA"
            : product.novedades == "si"
            ? "NOVEDADES"
            : 0
        }
        color={
          product.oferta == "si" && product.novedades != "si"
            ? "error"
            : product.novedades == "si"
            ? "success"
            : "info"
        }
  >

  <Card sx={{ display: 'flex', width:"100%" }}>
    <CardMedia 
      component="img" 
      image={imgSrc} 
      onError={handleImageError}
      sx={{minHeight:"90px", minWidth:"80px"}} 
      alt="sin imagen" 
      onClick={() => navigate(`/detail/${sku}`, { replace: true })}/>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }} onClick={() => navigate(`/detail/${sku}`, { replace: true })}>
          <Typography component="div" variant="h5" sx={{fontSize:{xs:"x-small",sm:"small",md:"medium"}}}>
            {name.length > maxLength ? (
              <>
                {isExpanded ? capitalizeFirstLetter(name) : `${capitalizeFirstLetter(name).substring(0, maxLength)}...`}
                <Button variant="text" size="small" onClick={(e) => {e.stopPropagation(); toggleExpanded()}} sx={{fontSize:"x-small"}}>
                  {isExpanded ? 'Leer menos' : 'Leer más'}
                </Button>
              </>
            ) : (
              capitalizeFirstLetter(name)
            )}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" sx={{fontSize:{xs:"x-small",sm:"small",md:"medium"}}}>
          {capitalizeFirstLetter(model)}
          </Typography>
            <Typography sx={{fontSize:{xs:"x-small",sm:"small"}}}  variant="caption" color="text.secondary">
              Código: {description}
            </Typography>
            <Typography sx={{ fontWeight: "bold", textDecoration: "none", color: canViewPrice ? "text.primary" : "primary.main", fontSize: canViewPrice ? {xs:"small",sm:"medium"} : {xs:"x-small",sm:"small"} }} variant="h6">
              {canViewPrice ? (price ? `$ ${ccyFormat(price)}` : "NO DISPONIBLE") : "Inicie sesión para ver precio"}
            </Typography>
          {isAdmin ? <>
              <LinkMui href={`${config.ADMINISTRADOR}/producto/${sku}`} target="_blank" style={{ textDecoration:"none", color:"inherit"}}>
                <Button startIcon={<EditIcon />} size="small" variant="contained" color="primary"  sx={{ fontSize: 12, mt:1}}>Editar</Button>
              </LinkMui>
            </> : <></>
          }
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
        <ItemCountHorizontal
            product={product}
            initial={1}
            stock={stock}
            price={price}
          />
        </Box>
      </Box>
    </Card>
    </StyledBadge>  

  </Box>

    </>
  );
}

export default ItemHorizontal

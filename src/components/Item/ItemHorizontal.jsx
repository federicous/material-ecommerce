import React from 'react'
import { Card,CardContent,CardMedia,Typography,Box,Button, Link as LinkMui } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import ItemCountHorizontal from '../ItemCount/ItemCountHorizontal';
import { Edit as EditIcon } from '@material-ui/icons';
// import {config} from "../../config/config";
import {config} from "../../config/config";

import ApiQuery from "../utils/apiQuery/apiQuery"
let apiQuery = new ApiQuery();

function capitalizeFirstLetter(string) {
  let cadena = string.toLowerCase()
  return cadena.charAt(0).toUpperCase() + cadena.slice(1);
}

const Item = ({product, name, description, img, stock, model,sku, price}) => {
  let navigate = useNavigate();
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    apiQuery.get(`/permisos`)
    .then((respuesta)=>{
      setIsAdmin(respuesta)
    })
  }, [])
  
	return (
    <>
  <Box>
  <Card sx={{ display: 'flex', width:"100%" }}>
    <CardMedia component="img" image={`${config.SERVER}/images/${img ? img : "sin_imagen.jpg"}`} sx={{minHeight:"90px", minWidth:"80px"}} alt="sin imagen" onClick={() => navigate(`/detail/${sku}`, { replace: true })}/>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }} onClick={() => navigate(`/detail/${sku}`, { replace: true })}>
          <Typography component="div" variant="h5" sx={{fontSize:{xs:"x-small",sm:"small",md:"medium"}}}>
            {capitalizeFirstLetter(name)}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" sx={{fontSize:{xs:"x-small",sm:"small",md:"medium"}}}>
          {capitalizeFirstLetter(model)}
          </Typography>
            <Typography sx={{fontSize:{xs:"x-small",sm:"small"}}}  variant="caption" color="text.secondary">
              Código: {description}
            </Typography>
            <Typography sx={{ fontWeight: "bold", textDecoration: "none", color:"text.primary" }} variant="h6">
            $ {price}
          </Typography>
          {isAdmin ? <>
              <LinkMui href={`${config.ADMINISTRADOR}/producto/${sku}`} style={{ textDecoration:"none", color:"inherit"}}>
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
          />
        </Box>
      </Box>

    </Card>
  </Box>


    </>
  );
}

export default Item

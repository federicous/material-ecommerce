import React, { useState, useEffect } from 'react'
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import ItemDetail from '../ItemDetail/ItemDetail';
import { useParams } from 'react-router';
// import { getFirestore } from '../../services/getFirebase';
import { Box } from '@material-ui/system';
import Return from '../utils/Return';
import axios from "axios";
// import {config} from "../../config/config"
import {config} from "../../config/config"
import Cookies from "universal-cookie";
import ApiQuery from "../utils/apiQuery/apiQuery";
let apiQuery = new ApiQuery();
const cookies = new Cookies();

// let dolar = config.DOLAR;

function ccyFormat(num) {
  let numFloat = parseFloat(num)
	return `${numFloat.toFixed(2)}`;
      }

const ItemDetailContainer = ({initial}) => {

	const {sku} = useParams()
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)
  const [dolar, setDolar] = useState(0)

  useEffect(() => {
    let cancel = false;
    apiQuery.get(`/api/dolar`)
		.then((respuesta) => {
      if (cancel) return;
      setDolar(Number(respuesta.dolar));
		})
    return () => { 
      cancel = true;
    }
  }, [])
  
 
  useEffect(() => {
    let cancel = false;
    // get token generated on login
    const token = cookies.get("token");
    // let someProducts = [];
    // set configurations
    const configuration = {
      method: "get",
      url: `${config.SERVER}/api/product/${sku}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        if (cancel) return;
        setProducts([result.data]);
      })
      .catch((error) => {
        error = new Error();
      })
      .finally(()=>{setLoading(false)})
      return () => { 
        cancel = true;
      }
  }, [sku]);

	return (
    <>
    <Typography variant={"h5"}>Detalle</Typography>
      {!products.length && loading ? (
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          container
          spacing={2}
        >
          {!loading && products.length ? (
            products.map((item) => (
              <Grid item key={item._id ? item._id : item.id} xs={12} sm={4} md={3}>
                <Box sx={{ width:"fit-content" }}>
                <ItemDetail
                  product={item}
                  initial={item.stock ? 1 : item.stock}
                  sku={item._id ? item._id : item.id }
                  model={item.label}
                  name={`${
                    [item.name,item.color,item.linea,item.presentacion,`${item.contenido ? (""+item.contenido) : ""}`].filter(Boolean).join(" | ")
                    }`}
                  description={item.code}
                  img={item.image}
                  // stock={item.stock ? item.stock : 100000}
                  stock={1000000}
                  price={ccyFormat(item.price ? item.price : item.usd*dolar) }
                />
                </Box>

              </Grid>
            ))
          ) : (
            <Box
              sx={{
		      display:'flex',
		      flexDirection:'column',		      
		      justifyContent:'center',
		      alignItems:'center',
		      marginTop:'10vh',              
              }}
            >
		<Typography variant="h4">
		This product does not exist
		</Typography>              
		<Return />
            </Box>
          )}
        </Grid>
      )}
    </>
  );
}

export default ItemDetailContainer

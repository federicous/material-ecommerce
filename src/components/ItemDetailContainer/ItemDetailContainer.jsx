import React, { useState, useEffect } from 'react'
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import ItemDetail from '../ItemDetail/ItemDetail';
import { useParams } from 'react-router';
import { getFirestore } from '../../services/getFirebase';
import { Box } from '@material-ui/system';
import Return from '../utils/Return';
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const ItemDetailContainer = ({initial}) => {

	const {sku} = useParams()
  console.log(sku);
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)

	// useEffect(() => {
	// 	    const db = getFirestore()
	// 	    db.collection('Items').where('sku', '==', parseInt(sku)).get()
	// 	    .then(respuesta => setProducts(respuesta.docs.map(item=>({id: item.id, ...item.data()}))))
	// 	    .catch(error=>{console.log(error);})
	// 	    .finally(()=>{setLoading(false)})
	// }, [sku])
  
  useEffect(() => {
    // get token generated on login
    console.log(sku);
    const token = cookies.get("token");
    let someProducts = [];
    // set configurations
    const configuration = {
      method: "get",
      url: `/api/product/${sku}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        console.log(result.data);
        console.log(sku);
        console.log(`consulta backend2`);
        // someProducts = allProducts.slice(4, 12);

        console.log(`consulta backend3`);
        console.log(someProducts);
        setProducts([result.data]);
        // redirect user to the auth page
        // window.location.href = "/auth";
        console.log(`consulta backend`);
        console.log(someProducts);
        // setLogin(true);
      })
      .catch((error) => {
        error = new Error();
      })
      .finally(()=>{setLoading(false)})
  }, [sku]);

	return (
    <>
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
              <Grid item key={item.sku} xs={12} sm={4} md={3}>
                <Box sx={{ width:"fit-content" }}>
                <ItemDetail
                  product={item}
                  sku={item.id}
                  initial={item.stock ? initial : item.stock}
                  name={`${item.name}`}
                  model={item.label}
                  description={item.code}
                  img={item.image}
                  stock={item.stock}
                  price={item.price}
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

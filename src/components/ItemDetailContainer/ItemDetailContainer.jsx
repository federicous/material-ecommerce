import React, { useState, useEffect } from 'react'
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import ItemDetail from '../ItemDetail/ItemDetail';
import { useParams } from 'react-router';
import { getFirestore } from '../../services/getFirebase';
import { Box } from '@material-ui/system';

const ItemDetailContainer = ({initial}) => {

	const {sku} = useParams()
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		    const db = getFirestore()
		    db.collection('Items').where('sku', '==', parseInt(sku)).get()
		    .then(respuesta => setProducts(respuesta.docs.map(item=>({id: item.id, ...item.data()}))))
		    .catch(error=>{console.log(error);
		console.log(`no se ecuentra el producto`);})
		    .finally(()=>{setLoading(false)})
	}, [sku])

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
                <ItemDetail
                  product={item}
                  sku={item.sku}
                  initial={item.quantityLimit ? initial : item.quantityLimit}
                  name={`${item.manufacturer}`}
                  model={item.modelNumber}
                  description={item.name}
                  img={item.image}
                  stock={item.quantityLimit}
                  price={item.regularPrice}
                />
              </Grid>
            ))
          ) : (
            <Box
              sx={{
		      display:'flex',
		      flexDirection:'center',		      
		      justifyContent:'center',
		      marginTop:'10vh',              
              }}
            >
		<Typography variant="h4">
		This product does not exist
		</Typography>              
            </Box>
          )}
        </Grid>
      )}
    </>
  );
}

export default ItemDetailContainer

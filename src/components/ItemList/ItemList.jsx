import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Item from "../Item/Item";
import { Box } from "@material-ui/system";


const ItemList = ({ products }) => {
  const productsList = products;

  return (
    <>
    {productsList.length
    ?
      <Grid container spacing={2} sx={{ marginTop: "0.1rem" }}>
        {productsList &&
          productsList.map((item) => (
            // <Grid item key={item.sku} xs={12} sm={4} md={3}>
            // 	<Item
            // 	sku={item.sku}
            // 	model={item.modelNumber}
            // 	name={`${item.manufacturer}`}
            // 	description={item.name}
            // 	img={item.image}
            // 	stock={item.quantityLimit}
            // 	price={item.regularPrice}
            // 	/>
            // </Grid>
            <Grid item key={item._id} xs={6} sm={4} md={3}>
              <Box  sx={{ width:"fit-content" }}>
              <Item
                product={item}
                initial={item.stock ? 1 : item.stock}
                sku={item._id ? item._id : item.id }
                model={item.label}
                name={`${item.name}`}
                description={item.code}
                img={item.image}
                stock={item.stock}
                price={item.price}
              />

              </Box>
              {/* <Item
                product={item}
                initial={item.stock ? 1 : item.stock}
                sku={item._id ? item._id : item.id }
                model={item.label}
                name={`${item.name}`}
                description={item.code}
                img={item.image}
                stock={item.stock}
                price={item.price}
              /> */}
            </Grid>
          ))}
      </Grid>
      :
      <Box sx={{marginTop:"2rem"}}>
        <Typography variant="h4">
          Sin resultados
        </Typography>
      </Box>
      }
    </>
  );
};

export default ItemList;

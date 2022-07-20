import React from "react";
import { Grid } from "@material-ui/core";
import Item from "../Item/Item";

const ItemList = ({ products }) => {
  const productsList = products;

  return (
    <>
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
            <Grid item key={item.id} xs={12} sm={4} md={3}>
              <Item
                sku={item._id ? item._id : item.id }
                model={item.label}
                name={`${item.name}`}
                description={item.code}
                img={item.image}
                stock={item.stock}
                price={item.price}
              />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default ItemList;

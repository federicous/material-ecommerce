import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Item from "../Item/Item";
import ItemHorizontal from "../Item/ItemHorizontal";
import PaginationLink from "../Pagination/Pagination";
import { Box } from "@material-ui/system";
import "./ItemList.css"

let dolar=132;

function ccyFormat(num) {
	return `${num.toFixed(2)}`;
      }

const ItemList = ({ products }) => {
  const productsList = products;

  return (
    <>
    {productsList.length
    ?
      <Grid container spacing={2} sx={{ marginTop: "0.1rem" }}>
        {productsList &&
          productsList.map((item) => (
            <Grid item key={item._id ? item._id : item.id} xs={12} sm={4} md={3}>
              <Box  sx={{ width:"auto" }}>
                <div className="item">
                    <Item
                    product={item}
                    initial={item.stock ? 1 : item.stock}
                    sku={item._id ? item._id : item.id }
                    model={item.label}
                    name={`${
                      [item.name,item.color,item.linea,item.presentacion,`${item.contenido ? (""+item.contenido) : ""}`].filter(Boolean).join("|")
                      }`}
                    description={item.code}
                    img={item.image}
                    stock={item.stock}
                    price={ccyFormat(item.price ? item.price : item.usd*dolar) }
                  />

                </div>
                <div className="itemHorizontal">
                    <ItemHorizontal
                    product={item}
                    initial={item.stock ? 1 : item.stock}
                    sku={item._id ? item._id : item.id }
                    model={item.label}
                    name={`${
                      [item.name,item.color,item.linea,item.presentacion,`${item.contenido ? (""+item.contenido) : ""}`].filter(Boolean).join("|")
                      }`}
                    description={item.code}
                    img={item.image}
                    stock={item.stock}
                    price={ccyFormat(item.price ? item.price : item.usd*dolar) }
                  />
                </div>

              </Box>
            </Grid>
          ))}
      </Grid>
      :
      ( productsList.length !== 0 ? <>
        <Box sx={{marginTop:"2rem"}}>
          <Typography variant="h4">
            Sin resultados
          </Typography>
        </Box>
      
      </>:<></>

      )
      }
    </>
  );
};

export default ItemList;

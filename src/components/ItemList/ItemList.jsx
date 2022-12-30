import React, { useState, useEffect } from 'react'
import { Grid, Typography } from "@material-ui/core";
import Item from "../Item/Item";
import ItemHorizontal from "../Item/ItemHorizontal";
import { Box } from "@material-ui/system";
import "./ItemList.css";
import {config} from "../../config/config";
import ApiQuery from "../utils/apiQuery/apiQuery";
let apiQuery = new ApiQuery();

// let dolar = config.DOLAR;

function ccyFormat(num) {
  let numFloat = parseFloat(num)
	return `${numFloat.toFixed(2)}`;
      }

const ItemList = ({ products }) => {

  const [dolar, setDolar] = useState(0)
  const productsList = products;

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


  return (
    <>
    {productsList.length
    ?
      <Grid container spacing={2} sx={{ marginTop: "0.1rem" }}>
        {productsList &&
          productsList.map((item) => (
            <Grid item key={item._id ? item._id : item.id} xs={12} sm={4} md={4} lg={3}>
              <Box  sx={{ width:"auto" }}>
                <div className="item">
                    <Item
                    product={item}
                    initial={item.stock ? 1 : item.stock}
                    sku={item._id ? item._id : item.id }
                    model={item.label}
                    name={`${
                      [item.name,item.color,item.linea,item.presentacion,`${(item.unidades!="0" && item.lista=="buloneria bremen") ? (`${item.unidades} unidades`) : ""}`,`${item.contenido ? (""+item.contenido) : ""}`].filter(Boolean).join(" | ")
                      }`}
                    description={item.code}
                    img={item.image}
                    // stock={item.stock ? item.stock : 100000}
                    stock={1000000}
                    price={item.price ? ccyFormat(item.price) : (item.usd ? ccyFormat(item.usd*dolar) : "") }
                  />

                </div>
                <div className="itemHorizontal">
                    <ItemHorizontal
                    product={item}
                    initial={item.stock ? 1 : item.stock}
                    sku={item._id ? item._id : item.id }
                    model={item.label}
                    name={`${
                      [item.name,item.color,item.linea,item.presentacion,`${(item.unidades!="0" && item.lista=="buloneria bremen") ? (`${item.unidades} unidades`) : ""}`,`${item.contenido ? (""+item.contenido) : ""}`].filter(Boolean).join("|")
                      }`}
                    description={item.code}
                    img={item.image}
                    // stock={item.stock ? item.stock : 100000}
                    stock={1000000}
                    price={item.price ? ccyFormat(item.price) : (item.usd ? ccyFormat(item.usd*dolar) : "") }
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

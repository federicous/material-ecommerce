import { Container } from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import Item from '../Item/Item'

const ItemList = ({initial, stock, addToCardWidget}) => {

const productArray = [
	{id:1, name:"Notebook Asus", precio:95000, stock:9, description:"Notebook ASUS X509JA Intel I3 1005 G1 | 4GB | 1Tb | 15.6 FULL HD", img:"https://s3-sa-east-1.amazonaws.com/saasargentina/FT73bvaQY55Yhw7isnVJ/imagen"},
	{id:2, name:"Notebook Asus", precio:95000, stock:5, description:"Notebook ASUS X509JA Intel I3 1005 G1 | 4GB | 1Tb | 15.6 FULL HD", img:"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6466/6466255_sd.jpg;maxHeight=200;maxWidth=300"},
	{id:3, name:"Notebook Asus", precio:95000, stock:15, description:"Notebook ASUS X509JA Intel I3 1005 G1 | 4GB | 1Tb | 15.6 FULL HD", img:"https://s3-sa-east-1.amazonaws.com/saasargentina/FT73bvaQY55Yhw7isnVJ/imagen"},
      ]

const [products, setProducts] = useState(null);

const getProducts = new Promise((resolve, reject) => {
	setTimeout(() => {
	  resolve(productArray);
	}, 2000);
      });

const getResponse = async () => {
	try {
	  const result = await getProducts;
	  setProducts(result);
	} catch (error) {
	  console.log("error en la consulta a la api");
	}
      };
useEffect(() => {
getResponse();
}, []);
	return (
		<Container sx={{
			display:"flex", 
			flexDirection:"row",
			justifyContent:"space-between"
			}}>
		{ products && products.map((item) => {
						
			return(
				<Item
				key={item.id}
				initial={initial} 
				name={item.name}
				description={item.description}
				img={item.img}
				stock={item.stock} 
				addToCardWidget={addToCardWidget}
				/>
			)
			}
			)
		}	
		</Container>
	)
}

export default ItemList
import React, { createContext, useState, useEffect } from 'react'
import axios from "axios";
import {config} from "../../config/config";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const CartContext = createContext();

const CartContextProvider = ({children}) => {

	const [modeTheme, setModeTheme] = useState("dark")
	const [cart, setCart] = useState([])
	const [total, setTotal] = useState(0)
	const [user, setUser] = useState("");
	const [ivaTotal, setIvaTotal] = useState(0)

	const token = cookies.get("token");

	function apiCartUpdate(newCart) {
		const configuration = {
			method: "post",
			url: `${config.SERVER}/api/cart`,
			headers: {
			  Authorization: `Bearer ${token}`,
			},
			data: newCart,
			withCredentials: true,
		      };
		    
		      // make the API call
		      axios(configuration)
			// .then((result) => {
			// 	console.log(result);
			// })
			.catch((error) => {
			  error = new Error();
			})
	}
	
	function addToCart(productAdd, counter) {	

		if (productAdd._id) { // Verifico si es mongo o si es sql
			if (cart.some(product=>product._id===productAdd._id)) {
				let productIndex=cart.findIndex(product=>product._id===productAdd._id)
				if ((cart[productIndex].qty+counter)<=cart[productIndex].stock) {
					cart[productIndex].qty+=counter
					apiCartUpdate([...cart])
					setCart([...cart])
				}else{
					alert("out of stock")
				}
			
			} else {
				productAdd.qty=counter
				apiCartUpdate([...cart,productAdd])
				setCart([...cart, productAdd])
			}
		} else {
			if (cart.some(product=>product.id===productAdd.id)) {
				let productIndex=cart.findIndex(product=>product.id===productAdd.id)
				if ((cart[productIndex].qty+counter)<=cart[productIndex].stock) {
					cart[productIndex].qty+=counter
					apiCartUpdate([...cart])
					setCart([...cart])
				}else{
					alert("out of stock")
				}
			
			} else {
				productAdd.qty=counter
				apiCartUpdate([...cart,productAdd])
				setCart([...cart, productAdd])
			}
		}
	}
	
	function removeFromCart(productIndex) {
		let aux= cart
		aux.splice(productIndex,1)
		apiCartUpdate([...aux])
		setCart([...aux])
	}

	function cleanCart() {
		apiCartUpdate([])
		setCart([])
	}

	useEffect(() => {
		let suma=0;
		for (const item of cart) {
			suma=parseFloat(item.qty)*parseFloat(item.price ? item.price : item.usd)+parseFloat(suma)
		}
		setTotal(suma);
		let sumaIva=0;
		for (const item of cart) {
			sumaIva=(parseFloat(item.qty)*parseFloat(item.price ? item.price : item.usd)*parseFloat(item.iva)/100)+parseFloat(sumaIva)
		}
		setIvaTotal(sumaIva);

	}, [cart])

	useEffect(() => {
		let cancel = false;
		const configuration = {
			method: "get",
			url: `${config.SERVER}/api/cart`,
			headers: {
			  Authorization: `Bearer ${token}`,
			},
			withCredentials: true,
		      };
		    
		      // make the API call
		      axios(configuration)
			.then((result) => {
				if (cancel) return;
				setCart([...result.data])
			})
			.catch((error) => {
			  error = new Error();
			})
			return () => { 
				cancel = true;
			      }
	}, [])
	

	return (
		<CartContext.Provider value={{
			cart,
			setCart,
			addToCart,
			removeFromCart,
			cleanCart,
			total,
			ivaTotal,
			setModeTheme,
			modeTheme,	
			setUser,
			user,		
		}}>
			{children}
		</CartContext.Provider>
	)
}

export default CartContextProvider

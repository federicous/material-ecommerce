import React, { createContext, useState, useEffect } from 'react'
import axios from "axios";
// import {config} from "../../config/config";
import {config} from "../../config/config";
import Cookies from "universal-cookie";
import ApiQuery from "../utils/apiQuery/apiQuery"
let apiQuery = new ApiQuery();

const cookies = new Cookies();
// let dolar = config.DOLAR;

export const CartContext = createContext();

const CartContextProvider = ({children}) => {

	const [modeTheme, setModeTheme] = useState("dark")
	const [cart, setCart] = useState([])
	const [total, setTotal] = useState(0)
	const [user, setUser] = useState("");
	const [ivaTotal, setIvaTotal] = useState(0)
	const [dolar, setDolar] = useState(0)
	const [descuento, setDescuento] = useState('');
	const [usuario, setUsuario] = useState('');

	const token = cookies.get("token");

	useEffect(() => {
		apiQuery.get(`/api/dolar`)
			.then((respuesta) => {
		  		setDolar(Number(respuesta.dolar))
			})	    
	      	}, [])


	useEffect(() => {
	if (usuario) {
		apiQuery.get(`/descuento?email=${usuario.email}`)
		.then((respuesta)=>{
		setDescuento(respuesta)
		})
	} else {
		apiQuery.get(`/descuento?email=${user}`)
		.then((respuesta)=>{
		setDescuento(respuesta)
		}) 
	}
	}, [usuario])

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
		console.log(cart);
		if (productAdd._id) { // Verifico si es mongo o si es sql
			if (cart.some(product=>product._id===productAdd._id)) {
				let productIndex=cart.findIndex(product=>product._id===productAdd._id)
				// if ((cart[productIndex].qty+counter)<=cart[productIndex].stock) {
					cart[productIndex].qty+=counter
					apiCartUpdate([...cart])
					setCart([...cart])
				// }else{
				// 	alert("out of stock")
				// }
			
			} else {
				productAdd.qty=counter
				apiCartUpdate([...cart,productAdd])
				setCart([...cart, productAdd])
			}
		} else {
			if (cart.some(product=>product.id===productAdd.id)) {
				let productIndex=cart.findIndex(product=>product.id===productAdd.id)
				// if ((cart[productIndex].qty+counter)<=cart[productIndex].stock) {
					cart[productIndex].qty+=counter
					apiCartUpdate([...cart])
					setCart([...cart])
				// }else{
				// 	alert("out of stock")
				// }
			
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

	function changeUser(user) {
		setUsuario(user)
	}

	function calcularPrecio(precioConIva,iva,price,usd,qty) {
		/* le saco el iva si viene incluido */
		let resultado = (precioConIva ? parseFloat(precioConIva)/(1+(parseFloat(typeof iva === "string" ? iva.replace(/,/g, '.').replace(/%/g, '') : iva))/100) : (price ? `${price}` : usd*dolar))*(qty ? parseFloat(qty) : 1);
		return resultado
	      }
	      

	useEffect(() => {
			// console.log(cart);
		if (usuario.descuento) {
			let suma=0;
			for (const item of cart) {
				// suma=parseFloat(item.qty)*parseFloat(item.price ? item.price : item.usd*dolar)+parseFloat(suma)
				suma = calcularPrecio(item.precioConIva,item.iva,item.price,item.usd,item.qty)+parseFloat(suma)
			}
			setTotal(suma);
			let sumaIva=0;
			for (const item of cart) {
				let IVA=parseFloat(typeof item.iva === "string" ? item.iva.replace(/,/g, '.').replace(/%/g, '') : item.iva);
				// let PRICE = parseFloat(item.price ? item.price : item.usd*dolar);
				let PRICE = calcularPrecio(item.precioConIva,item.iva,item.price,item.usd)
				let QTY=parseInt(item.qty);
				sumaIva=(QTY*(PRICE-PRICE*(parseFloat(usuario.descuento)/100))*IVA/100)+parseFloat(sumaIva);
			}
			setIvaTotal(sumaIva);			
		} else {
			let suma=0;
			for (const item of cart) {
				// suma=parseFloat(item.qty)*parseFloat(item.price ? item.price : item.usd*dolar)+parseFloat(suma)
				suma = calcularPrecio(item.precioConIva,item.iva,item.price,item.usd,item.qty)+parseFloat(suma)
			}
			setTotal(suma);
			let sumaIva=0;
			for (const item of cart) {
				let IVA=parseFloat(typeof item.iva === "string" ? item.iva.replace(/,/g, '.').replace(/%/g, '') : item.iva);
				// let PRICE = parseFloat(item.price ? item.price : item.usd*dolar);
				let PRICE = calcularPrecio(item.precioConIva,item.iva,item.price,item.usd)
				let QTY=parseInt(item.qty);
				// sumaIva=(QTY*PRICE*IVA/100)+parseFloat(sumaIva);
				sumaIva=PRICE*IVA/100
			}
			setIvaTotal(sumaIva);
		}
		// console.log(total);
	}, [cart, usuario])

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
			changeUser,	
		}}>
			{children}
		</CartContext.Provider>
	)
}

export default CartContextProvider

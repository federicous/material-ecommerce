import React, { createContext, useState, useEffect } from 'react'
import axios from "axios";
// import {config} from "../../config/config";
import {config} from "../../config/config";
import Cookies from "universal-cookie";
import ApiQuery from "../utils/apiQuery/apiQuery"
import ItemClass from '../utils/ItemClass/ItemClass';
let itemClass = new ItemClass();
let apiQuery = new ApiQuery();

const cookies = new Cookies();
// let dolar = config.DOLAR;

// const usuarioCookie = cookies.get("user");

function ccyFormat(num) {
	let numFloat = parseFloat(num)
	      return `${numFloat.toFixed(2)}`;
}

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
	const [IdVendedor, setIdVendedor] = useState('');

	const token = cookies.get("token");

	useEffect(() => {
		apiQuery.get(`/api/dolar`)
			.then((respuesta) => {
		  		setDolar(Number(respuesta.dolar))
			})	    
	      	}, [])

	useEffect(() => {
		let usuarioCookie = cookies.get("user");
		setUser(usuarioCookie)
		let idVendedorCookie = cookies.get("IdVendedor")
		setIdVendedor(idVendedorCookie)
		apiQuery.get(`/descuento?email=${usuarioCookie}`)
		.then((respuesta)=>{
			// console.log(`usuarioCookie: ${usuarioCookie}`);	
			// console.log(respuesta);
			setDescuento(respuesta)
		})
		}, [])

	useEffect(() => {
		if (usuario?.email) {
			apiQuery.get(`/descuento?email=${usuario.email}`)
			.then((respuesta)=>{
				setDescuento(respuesta)
				// console.log(`usuario: ${usuario.email}`);
				// console.log(respuesta);
			})
		} else if (user?.email)  {
			apiQuery.get(`/descuento?email=${user}`)
			.then((respuesta)=>{
				setDescuento(respuesta)
				// console.log(`user: ${user}`);
				// console.log(respuesta);		
			}) 
		}
	
	}, [usuario, user])

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

	function calcularPrecio(precioConIva,iva,precio,usd,qty,oferta,precioOferta) {
		// let price = (oferta && oferta=="si" && precioOferta) ? ccyFormat(precioOferta) : precio
		// /* le saco el iva si viene incluido */
		// let resultado = (precioConIva ? parseFloat(precioConIva)/(1+(parseFloat(typeof iva === "string" ? iva.replace(/,/g, '.').replace(/%/g, '') : iva))/100) : ((price && precio != 0) ? `${price}` : usd*dolar))*(qty ? parseFloat(qty) : 1);
		// // let resultado = (precioConIva ? parseFloat(precioConIva)/(1+(parseFloat(typeof iva === "string" ? iva.replace(/,/g, '.').replace(/%/g, '') : iva))/100) : (usd ? usd*dolar : `${price}`))*(qty ? parseFloat(qty) : 1);
		// return resultado
		return(itemClassContext.calcularPrecioContext(precioConIva,iva,precio,usd,qty,oferta,precioOferta,dolar))

	}
	      

	useEffect(() => {
			// console.log(cart);
		// if (usuario.descuento) {
		// 	let suma=0;
		// 	for (const item of cart) {
		// 		// suma=parseFloat(item.qty)*parseFloat(item.price ? item.price : item.usd*dolar)+parseFloat(suma)
		// 		suma = calcularPrecio(item.precioConIva,item.iva,item.price,item.usd,item.qty,item.oferta,item.precioOferta)+parseFloat(suma)
		// 	}
		// 	setTotal(suma);
		// 	let sumaIva=0;
		// 	for (const item of cart) {
		// 		let IVA=parseFloat(typeof item.iva === "string" ? item.iva.replace(/,/g, '.').replace(/%/g, '') : item.iva);
		// 		// let PRICE = parseFloat(item.price ? item.price : item.usd*dolar);
		// 		let PRICE = calcularPrecio(item.precioConIva,item.iva,item.price,item.usd,1,item.oferta,item.precioOferta)
		// 		let QTY=parseInt(item.qty);
		// 		sumaIva=(QTY*(PRICE-PRICE*(parseFloat(usuario.descuento)/100))*IVA/100)+parseFloat(sumaIva);
		// 	}
		// 	setIvaTotal(sumaIva);			
		// } else {
			let suma=0;
			for (const item of cart) {
				// suma=parseFloat(item.qty)*parseFloat(item.price ? item.price : item.usd*dolar)+parseFloat(suma)
				suma = calcularPrecio(item.precioConIva,item.iva,item.price,item.usd,item.qty,item.oferta,item.precioOferta)+parseFloat(suma)
			}
			setTotal(suma);
			let sumaIva=0;
			for (const item of cart) {
				let IVA=parseFloat(typeof item.iva === "string" ? item.iva.replace(/,/g, '.').replace(/%/g, '') : item.iva);
				// let PRICE = parseFloat(item.price ? item.price : item.usd*dolar);
				let PRICE = calcularPrecio(item.precioConIva,item.iva,item.price,item.usd,1,item.oferta,item.precioOferta)
				let QTY=parseInt(item.qty);
				sumaIva=parseFloat(QTY*PRICE*IVA/100)+parseFloat(sumaIva);
			}
			setIvaTotal(sumaIva);
		// }
		// console.log(total);
	}, [cart, usuario,user,descuento])

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
	
// function ccyFormat(num) {
//   let numFloat = parseFloat(num)
//   return `${numFloat.toFixed(2)}`;
// }

    function aplicarDescuento(precio, porcentaje = 0) {
	precio = Number(precio);
	porcentaje = Number(porcentaje);
	
	if (isNaN(precio) || isNaN(porcentaje)) {
	    throw new Error('Los parámetros deben ser números válidos.');
	}
	
	const factor = 1 - (porcentaje / 100);
	return precio * factor;
    }
    

class ItemClassContext {
	get valorActual() {
		return descuento; // Obtiene siempre el valor actualizado
	    }
	calcularPrecio(item, dolar) {
		let precioConIva = parseFloat(item.precioConIva)
		let iva = item.iva
		let precio = parseFloat(item.price)
		let usd = parseFloat(item.usd)
		let qty = 1
		let oferta = item.oferta
		let precioOferta = parseFloat(item.precioOferta)

		let price = (oferta && oferta == "si" && precioOferta) ? ccyFormat(precioOferta) : parseFloat(precio)
		/* le saco el iva si viene incluido */
		let resultado = (precioConIva ? parseFloat(precioConIva) / (1 + (parseFloat(typeof iva === "string" ? iva.replace(/,/g, '.').replace(/%/g, '') : iva)) / 100) : parseFloat((usd && `${usd}` != "0") ? usd * dolar : `${price}`)) * (qty ? parseFloat(qty) : 1);
		// return ccyFormat(parseFloat(resultado))
		return ccyFormat(parseFloat(aplicarDescuento(resultado,this.valorActual)))

	}
	/* Backup funcion anterior */
	calcularPrecio2(item, dolar) {
		if (item.oferta && item.oferta == "si" && item.precioOferta) {
			return ccyFormat(item.precioOferta)
		}
		// let pesos = item.price ? item.price : (item.usd ? item.usd*dolar : "") 
		let pesos = item.usd ? (item.usd ? item.usd * dolar : "") : parseFloat(item.price);
		let iva = parseFloat(typeof item.iva === "string" ? item.iva.replace(/,/g, '.').replace(/%/g, '') : item.iva)
		let precio = item.precioConIva ? ccyFormat(item.precioConIva / (1 + iva / 100)) : (pesos ? `$ ${ccyFormat(pesos)}` : "NO DISPONIBLE")
		return ccyFormat(pesos)
	}

	calcularPrecioContext(precioConIva, iva, precio, usd, qty, oferta, precioOferta, dolar) {
		let price = (oferta && oferta == "si" && precioOferta) ? ccyFormat(precioOferta) : parseFloat(precio)
		/* le saco el iva si viene incluido */
		// let resultado = (precioConIva ? parseFloat(precioConIva) / (1 + (parseFloat(typeof iva === "string" ? iva.replace(/,/g, '.').replace(/%/g, '') : iva)) / 100) : ((price && precio != 0) ? `${price}` : usd * dolar)) * (qty ? parseFloat(qty) : 1);
		let resultado = (precioConIva ? parseFloat(precioConIva) / (1 + (parseFloat(typeof iva === "string" ? iva.replace(/,/g, '.').replace(/%/g, '') : iva)) / 100) : ((usd && `${usd}` != "0") ? usd * dolar : `${price}`)) * (qty ? parseFloat(qty) : 1);
		// let resultado = (precioConIva ? parseFloat(precioConIva)/(1+(parseFloat(typeof iva === "string" ? iva.replace(/,/g, '.').replace(/%/g, '') : iva))/100) : (usd ? usd*dolar : `${price}`))*(qty ? parseFloat(qty) : 1);
		// return resultado
		return aplicarDescuento(resultado,this.valorActual)
	}
	calcularPrecioCantidad(precioConIva, iva, precio, usd, qty, oferta, precioOferta, dolar) {
		let price = (oferta && oferta == "si" && precioOferta) ? ccyFormat(precioOferta) : parseFloat(precio)
		/* le saco el iva si viene incluido */
		let resultado = (precioConIva ? parseFloat(precioConIva) / (1 + (parseFloat(typeof iva === "string" ? iva.replace(/,/g, '.').replace(/%/g, '') : iva)) / 100) : ((usd && `${usd}` != "0") ? usd * dolar : `${price}`)) * (qty ? parseFloat(qty) : 1);
		// return ccyFormat(resultado)
		return ccyFormat(parseFloat(aplicarDescuento(resultado,this.valorActual)))
	}
}
// export default ItemClass;
let itemClassContext = new ItemClassContext();

// let precio = item.precioConIva ? ccyFormat(item.precioConIva/(1+iva/100)) : (price ? `$ ${ccyFormat(price)}` : "NO DISPONIBLE")

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
			dolar,
			itemClassContext,
			IdVendedor,
		}}>
			{children}
		</CartContext.Provider>
	)
}

export default CartContextProvider

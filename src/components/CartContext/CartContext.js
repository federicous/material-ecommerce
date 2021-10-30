import React, { createContext, useState, useEffect } from 'react'

export const CartContext = createContext();

const CartContextProvider = ({children}) => {

	const [cart, setCart] = useState([])
	const [total, setTotal] = useState(0)
	
	function addToCart(productAdd, counter) {
		if (cart.some(product=>product.sku===productAdd.sku)) {
			console.log("repetido");
			let productIndex=cart.findIndex(product=>product.sku===productAdd.sku)
			if ((cart[productIndex].qty+counter)<=cart[productIndex].quantityLimit) {
				cart[productIndex].qty+=counter
				setCart([...cart])
			}else{
				alert("out of stock")
			}
		
		} else {
			console.log("sin repetir");
			productAdd.qty=counter
			// productAdd.index=cart.length
			setCart([...cart, productAdd])
	
		}
	}
	
	function removeFromCart(productIndex) {
		let aux= cart
		aux.splice(productIndex,1)
		setCart([...aux])
	}

	useEffect(() => {
		console.log(cart)
		let suma=0;
		for (const item of cart) {
			suma=item.qty*item.regularPrice+suma
			console.log(item.qty);
			console.log(item.regularPrice);
		}
		setTotal(suma)		

	}, [cart])

	return (
		<CartContext.Provider value={{
			cart,
			setCart,
			addToCart,
			removeFromCart,
			total,
		}}>
			{children}
		</CartContext.Provider>
	)
}



export default CartContextProvider

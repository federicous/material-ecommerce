import React, { createContext, useState, useEffect } from 'react'

export const CartContext = createContext();

const CartContextProvider = ({children}) => {

	const [cart, setCart] = useState([])
	
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
			setCart([...cart, productAdd])
	
		}
	}

	useEffect(() => {
		console.log(cart)		
	}, [cart])

	return (
		<CartContext.Provider value={{
			cart,
			setCart,
			addToCart,
		}}>
			{children}
		</CartContext.Provider>
	)
}



export default CartContextProvider

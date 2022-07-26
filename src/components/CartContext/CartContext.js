import React, { createContext, useState, useEffect } from 'react'

export const CartContext = createContext();

const CartContextProvider = ({children}) => {

	const [cart, setCart] = useState([])
	const [total, setTotal] = useState(0)
	
	function addToCart(productAdd, counter) {
		// if (cart.some(product=>product.sku===productAdd.sku)) {
		// 	let productIndex=cart.findIndex(product=>product.sku===productAdd.sku)
		// 	if ((cart[productIndex].qty+counter)<=cart[productIndex].quantityLimit) {
		// 		cart[productIndex].qty+=counter
		// 		setCart([...cart])
		
		if (cart.some(product=>product._id===productAdd._id)) {
			let productIndex=cart.findIndex(product=>product._id===productAdd._id)
			if ((cart[productIndex].qty+counter)<=cart[productIndex].quantityLimit) {
				cart[productIndex].qty+=counter
				setCart([...cart])
			}else{
				alert("out of stock")
			}
		
		} else {
			productAdd.qty=counter
			setCart([...cart, productAdd])
		}
		console.log("addtocoart");
		console.log(cart);
	}
	
	function removeFromCart(productIndex) {
		let aux= cart
		aux.splice(productIndex,1)
		setCart([...aux])
	}

	function cleanCart() {
		setCart([])
	}

	useEffect(() => {
		let suma=0;
		for (const item of cart) {
			suma=item.qty*item.price+suma
		}
		setTotal(suma)		

	}, [cart])

	return (
		<CartContext.Provider value={{
			cart,
			setCart,
			addToCart,
			removeFromCart,
			cleanCart,
			total,
		}}>
			{children}
		</CartContext.Provider>
	)
}

export default CartContextProvider

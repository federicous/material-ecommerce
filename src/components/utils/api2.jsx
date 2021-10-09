import axios from "axios";

const api2 = axios.create({
	// baseURL: "https://api.mercadolibre.com/",
	// baseURL : "https://api.bestbuy.com/v1/products",
	baseURL : "https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))?apiKey=zIORAv06W1eGJM2Drgksm7Ku&format=json",
	// baseURL: "https://rickandmortyapi.com/api",
	// baseURL: "https://fakestoreapi.com/products/",
	// params: {
	// 	// api_key: "mi_apikey",
	// 	page: 1,
	// 	language: "en_US",
	// 	categoryId : "(categoryPath.id=abcat0502000)",
	// 	apiKey : "?apiKey=zIORAv06W1eGJM2Drgksm7Ku",
	// 	sortOptions : "&sort=.asc",
	// 	responseFormat : "&format=json",
	// }
})

export {api2}

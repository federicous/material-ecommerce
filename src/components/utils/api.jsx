import axios from "axios";

const api = axios.create({
	baseURL: "https://api.mercadolibre.com/",
	params: {
		api_key: "mi_apikey",
		page: 1,
		language: "en_US"
	}
})

export {api}

import axios from "axios";
import ApiQuery from "../components/utils/apiQuery/apiQuery";
let apiQuery = new ApiQuery();
require('dotenv').config();
let SERVIDOR_NODE = process.env.REACT_APP_SERVER;
let ADMINISTRADOR = process.env.REACT_APP_ADMIN;


// const configuration = {
// 	method: "get",
// 	url: "http://localhost:8088/api/dolar",
// };
// let DOLAR_OFICIAL_VENTA;
// // make the API call
// axios(configuration)
// 	.then((result) => {
// 		DOLAR_OFICIAL_VENTA = result
// 		// console.log(DOLAR_OFICIAL_VENTA);

// 	})
// 	.catch((error) => {
// 		error = new Error();
// 	})

// function dolarQuery() {
// 	return 2000
// 	apiQuery.get(`/api/dolar`)
// 		.then((respuesta) => {
// 			return respuesta
// 		})
// }
// apiQuery.get(`/api/dolar`)
// 	.then((respuesta) => {
// 		console.log(`Valor del DOLAR: ${respuesta}`);
// 		//   setIsAdmin(respuesta)

// 	})

export const config = {
	// SERVER_LOCAL: `http://localhost:8088`,
	SERVER: SERVIDOR_NODE || `http://app.distribuidorabrmtools.com:8088`,
	DOLAR: 0,
	ADMINISTRADOR: ADMINISTRADOR,
}

// export const config = async () => {
// 	// SERVER_LOCAL: `http://localhost:8088`,
// 	try {
// 		let result = await axios(configuration)
// 		DOLAR_OFICIAL_VENTA =[...result.data].filter((tipo)=> tipo.casa.nombre == "Dolar Oficial")[0].casa.venta
// 			console.log(DOLAR_OFICIAL_VENTA);

// 		return(
// 			{
// 				SERVER: SERVIDOR_NODE || `http://app.distribuidorabrmtools.com:8088`,
// 				DOLAR: DOLAR_OFICIAL_VENTA ? parseFloat(DOLAR_OFICIAL_VENTA) : 232,
// 			}
// 		)
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

// async function config() {
// 	const result = await axios(configuration)
// 	let DOLAR_OFICIAL_VENTA =[...result.data].filter((tipo)=> tipo.casa.nombre == "Dolar Oficial")[0].casa.venta
// 	return {
// 		SERVER: SERVIDOR_NODE || `http://app.distribuidorabrmtools.com:8088`,
// 		DOLAR: DOLAR_OFICIAL_VENTA ? parseFloat(DOLAR_OFICIAL_VENTA) : 232,
// 	}
//     }

//     module.exports = config()
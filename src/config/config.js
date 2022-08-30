require('dotenv').config();
let SERVIDOR_NODE= process.env.REACT_APP_SERVER;

export const config = {
	// SERVER_LOCAL: `http://localhost:8088`,
	SERVER: SERVIDOR_NODE || `http://app.distribuidorabrmtools.com:8088`,
}


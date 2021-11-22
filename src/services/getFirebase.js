import firebase from "firebase"
import 'firebase/firestore'

const firebaseConfig = {
	apiKey: "AIzaSyBIx87o70jA2M51OaiCZBTtfSoZMWAEhnY",
	authDomain: "material-ecommerce.firebaseapp.com",     
	projectId: "material-ecommerce",      
	storageBucket: "material-ecommerce.appspot.com",      
	messagingSenderId: "1095053766147",      
	appId: "1:1095053766147:web:479d0e3f47d8481354e836"      
};
const app = firebase.initializeApp(firebaseConfig) 

export function getFirestore(){
	 return firebase.firestore(app) 
	} 
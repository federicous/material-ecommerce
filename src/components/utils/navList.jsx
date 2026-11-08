import bremenLogo from "./images/logo-bremen-white.svg";
import wembley from "./images/wembley.webp";
import kantonLogo from "./images/logo-kanton-blanco.png";
import sinpar from "./images/sinpar2.jpg";
import coltec from "./images/coltec2.jpg";
import interquim from "./images/interquim.jpg";
import einhell from "./images/einhell-logo.png";
import kwb from "./images/kwb.png";

const navList =[
	{id:"1", name:"Bremen", value:"Bremen", image:`${bremenLogo}`, logoWidth:"54%", logoHeight:"auto", logoBackground:"#0b2e5f"},
	{id:"2", name:"Wembley", value:"Wembley", image:`${wembley}`},
	// {id:"5", name:"Coltec", value:"Coltec", image:`${coltec}`},
	{id:"4", name:"Sinpar", value:"Sinpar", image:`${sinpar}`},
	// {id:"7", name:"Einhell", value:"Einhell", image:`${einhell}`},
	// {id:"8", name:"KWB", value:"KWB", image:`${kwb}`},
	{id:"3", name:"Kanton", value:"Kanton", image:`${kantonLogo}`, logoWidth:"auto", logoHeight:"38%", logoBackground:"#000000"},
	// {id:"6", name:"Interquim", value:"Interquim", image:`${interquim}`},
      ]
export {navList}

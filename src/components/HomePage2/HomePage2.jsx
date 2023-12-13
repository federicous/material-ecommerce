import { useEffect, useState, useContext } from "react";
import { Typography, Box, Pagination, Stack, useMediaQuery, Backdrop, CircularProgress, Alert, AlertTitle  } from "@material-ui/core";
// import { getFirestore } from "../../services/getFirebase";
import ItemList from "../ItemList/ItemList";
import { Link } from 'react-router-dom';
import { navList } from '../utils/navList';
import { ImageButton, ImageSrc, Image,ImageBackdrop, ImageMarked  } from '../utils/homePageUtils';
// import { CartContext } from '../CartContext/CartContext';
import axios from "axios";
// import {config} from "../../config/config"
import {config} from "../../config/config"
import Cookies from "universal-cookie";
const cookies = new Cookies();


export default function HomePage2() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState(false);
  // Backdrop or Loading spinner 
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };


	let pageSize = 12;
	const [pagesCant, setPagesCant] = useState(10)
  // const [navList, setNavList] = useState([])
  // const cartContext = useContext(CartContext);
	// const {user}= cartContext;
  const isMobile = useMediaQuery('(max-width:600px)');
 
	const handleChange = (event, value) => {
		setPage(value);
	      };
  
  const token = cookies.get("token");

    useEffect(() => {
      let cancel = false;
      setOpen(true)
      const configuration = {
        method: "get",
        url: `${config.SERVER}/api/products?page=${page}&pageSize=${pageSize}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };
        // make the API call
        axios(configuration)
        .then((result) => {
          if (cancel) return;
          setProducts([...result.data.allProducts])
          setPagesCant(Math.ceil(result.data.total/pageSize))
          setOpen(false)
        })
        .catch((error) => {
          setErrorMessage(true)
          setOpen(false)
          error = new Error();
        })
        return () => { 
          cancel = true;
        }
    }, [page])

  return (
    <>
    {/* <Typography variant={"h5"}>Categories</Typography> */}
    <Box component="span" 
      sx={{
        display: "flex",
        flexWrap: "wrap", 
        justifyContent: "center",
        alignItems: "center",
        minWidth: 300,
        width: "100%",
        flexDirection: "row",
        // marginTop: "2rem",
      }} >
    <Alert severity="warning">
        <AlertTitle>ATENCIÓN</AlertTitle>
        Debido a la situación económica del país <strong>los precios se definirán el día de la facturación</strong>
      </Alert>
      </Box>
    <Box component="span" 
      sx={{
        display: "flex",
        flexWrap: "wrap", 
        justifyContent: "center",
        alignItems: "center",
        minWidth: 300,
        width: "100%",
        flexDirection: "row",
        marginTop: "2rem",
      }}
    >
      {navList.map((item) => (
        <ImageButton
          focusRipple
          key={item.name}
          style={{
            width: "20%",
          }}
          sx={{mb:3}}
        >
          {/* <Link key={item.id} to={`/category/${item.value}`}> */}
          <Link key={item.id} to={`/brand/${item.value.toLowerCase()}`}>
            <ImageSrc style={{ backgroundImage: `url(${item.image})` }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={{
                  position: "relative",
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  textShadow:"2px 2px 5px black",
                }}
              >
                {item.name}
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </Link>
        </ImageButton>
      ))}

 {isMobile || open ? (
    <></>
    ):(
    <>
      {errorMessage ? (<>
        
        <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        No se pudieron cargar los datos — <strong>Falló la conexión</strong>
        </Alert>

      </>) : (<>
        <Typography variant={"h5"}>Productos</Typography>
            <ItemList products={products} />
            <Box sx={{my:2}}>
              <Stack spacing={2}>
                <Pagination count={pagesCant} page={page} onChange={handleChange} />
              </Stack>
            </Box>
      </>)}
    </>
  )}
        {/* <ItemListContainer products={products} /> */}
      {/* </Box> */}
    </Box>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
        >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

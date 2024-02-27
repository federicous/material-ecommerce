import { useEffect, useState, useContext } from "react";
import { Typography, Box, Pagination, Stack, useMediaQuery, Backdrop, CircularProgress, Alert, AlertTitle, Modal  } from "@material-ui/core";
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
import ApiQuery from "../utils/apiQuery/apiQuery";
let apiQuery = new ApiQuery();
const cookies = new Cookies();

let item = {
  img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
  title: 'Breakfast',
}

export default function HomePage2() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState(false);
  // Backdrop or Loading spinner 
  const [open, setOpen] = useState(false);
  const [imagenPromo, setImagenPromo] = useState("")
  const [promo, setPromo] = useState({})
  const handleClose = () => {
    setOpen(false);
  };

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    // bgcolor: 'background.paper',
    // bgcolor: 'white',
    border: 'none',
    boxShadow: 24,
    objectFit: "cover",
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
    apiQuery.get(`/api/promo`)
		.then((respuesta) => {
      setPromo(respuesta[0])
      if (respuesta[0].habilitar == "on") {
        setOpenModal(true)
      } else {
        setOpenModal(false)
      }
			//   setIsAdmin(respuesta)
		})
  }, [])

    useEffect(() => {
      let cancel = false;
      setOpen(true)
      // setOpenModal(true)
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
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // sx={{p:0,m:0, objectFit: "cover",}}
      >
        <Box sx={modalStyle}>
          {/* <img
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=564&h=564&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
            sx={{objectFit: "cover", border: '2px solid #000', boxShadow: 24, m: 0, p: 0}}
          /> */}
          <Box
        component="img"
        sx={{
          // height: 233,
          width: 650,
          // maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 850 },
          // objectFit: "cover",
          border: "none"
        }}
        alt="Novedades y promociones"
        // src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
        // src={`${item.img}`}
        src={`${config.SERVER}/images/promocion/${promo?.image ? promo.image : "sin_imagen.jpg"}`}
      />
        </Box>
      </Modal>
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

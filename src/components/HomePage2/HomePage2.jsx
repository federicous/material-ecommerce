import React, { useEffect, useState, useContext } from "react";
import { Typography, Box, Pagination, Stack, useMediaQuery, Backdrop, CircularProgress, Alert, AlertTitle, Modal, IconButton  } from "@material-ui/core";
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
import CloseIcon from '@material-ui/icons/Close';
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
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  // Sentinel logic for infinite scroll
  const observer = React.useRef();
  const lastElementRef = React.useCallback(node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting && hasMore) {
              setPage(prevPage => prevPage + 1);
          }
      });
      if (node) observer.current.observe(node);
  }, [loading, hasMore]);

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

  const getRoute = (val) => {
    if (!val) return "/";
    const key = val.toLowerCase();
    const special = {
      wembley: "/search/wembley",
      einhell: "/search/einhell",
      kwb: "/search/kwb",
      // add more special cases here, e.g.
      // outlet: "/search/outlet",
    };
    return special[key] || `/brand/${key}`;
  };

  useEffect(() => {
    apiQuery.get(`/api/promo`)
		.then((respuesta) => {
      if (respuesta && respuesta.length > 0 && respuesta[0]) {
        setPromo(respuesta[0])
        if (respuesta[0].habilitar == "on") {
          setOpenModal(true)
        } else {
          setOpenModal(false)
        }
      }
		})
		.catch(() => {})
  }, [])

    useEffect(() => {
      let cancel = false;
      // setOpen(true)
      setLoading(true);
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
          // setProducts([...result.data.allProducts])
          setProducts(prev => {
            // Filter out duplicates based on _id
            const newProducts = result.data.allProducts.filter(newP => 
                !prev.some(existingP => existingP._id === newP._id)
            );
            return [...prev, ...newProducts];
          });
          setPagesCant(Math.ceil(result.data.total/pageSize))
          // setOpen(false)
          
          if (result.data.allProducts.length === 0 || page >= Math.ceil(result.data.total/pageSize)) {
            setHasMore(false);
          }
          
          setLoading(false);
          setInitialLoad(false);

        })
        .catch((error) => {
          setErrorMessage(true)
          setLoading(false);
          // setOpen(false)
          setInitialLoad(false);
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
        <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
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
            width: "30%",
          }}
          // sx={{mb:3}}
        >
          {/* <Link key={item.id} to={`/category/${item.value}`}> */}
          <Link key={item.id} to={getRoute(item.value)}>
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
      }}>
      {isMobile || false ? (
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
              
              {initialLoad && page === 1 ? (
                 <Box sx={{ display: 'flex', mt:"10vh", height:"100%", justifyContent: 'center' }}>
                   <CircularProgress />
                 </Box>
              ) : (
                <>
                  <ItemList products={products} />
                  
                  {/* Sentinel for Infinite Scroll */}
                  {!loading && hasMore && <div ref={lastElementRef} style={{ height: '20px', margin: '10px 0' }} />}
                  
                  {/* Bottom Loader */}
                  {loading && page > 1 && (
                    <Box display="flex" justifyContent="center" my={4}>
                      <CircularProgress disableShrink/>
                    </Box>
                  )}

                  {!hasMore && products.length > 0 && (
                    <Box display="flex" justifyContent="center" my={2}>
                      <Typography variant="body2" color="textSecondary">No hay más productos</Typography>
                    </Box>
                  )}
                </>
              )}
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

import { useEffect, useState } from "react";
import { Typography, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import { navList } from "../utils/navList";
import {
  ImageButton,
  ImageSrc,
  Image,
  ImageBackdrop,
  ImageMarked,
} from "../utils/homePageUtils";
// import { getFirestore } from "../../services/getFirebase";
import ItemList from "../ItemList/ItemList";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function HomePage2() {
  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   let someProducts = [];
  //   const db = getFirestore();
  //   db.collection("Items")
  //     .get()
  //     .then((respuesta) => {
  //       let allProducts = respuesta.docs.map((item) => ({
  //         id: item.id,
  //         ...item.data(),
  //       }));
  //       someProducts = allProducts.slice(4, 12);
  //       setProducts(someProducts);
  //     });
  // }, []);

  useEffect(() => {
    // get token generated on login
    const token = cookies.get("token");
    let someProducts = [];
    // set configurations
    const configuration = {
      method: "get",
      url: "/api/product",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        setProducts(result.data);
      })
      .catch((error) => {
        error = new Error();
      });
  }, []);

  return (
    <>
    <Typography variant={"h5"}>Categories</Typography>
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        minWidth: 300,
        width: "100%",
        marginTop: "2rem",
      }}
    >
      {navList.map((item) => (
        <ImageButton
          focusRipple
          key={item.name}
          style={{
            width: "33%",
          }}
        >
          <Link key={item.id} to={`/category/${item.value}`}>
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
                }}
              >
                {item.name}
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </Link>
        </ImageButton>
      ))}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          minWidth: 300,
          width: "100%",
          marginTop: "2rem",
        }}
      >
        <Typography variant={"h5"}>Products</Typography>
      </Box>
      <Box>
        <ItemList products={products} />
      </Box>
    </Box>
    </>
  );
}

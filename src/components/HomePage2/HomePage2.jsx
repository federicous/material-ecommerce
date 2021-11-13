import * as React from 'react';
import { Typography, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { navList } from '../utils/navList';
import { ImageButton, ImageSrc, Image,ImageBackdrop, ImageMarked  } from '../utils/homePageUtils';

export default function HomePage2() {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        minWidth: 300,
        width: "100%",
        marginTop: "1rem",
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
    </Box>
  );
}

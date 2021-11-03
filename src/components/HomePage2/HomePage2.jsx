import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import { Typography, ButtonBase, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';


const navList =[
	{id:"1", name:"Laptops", value:"laptops", image:"https://assets.cybermonday.com.ar/uploads/tips/97/orig-1603762372LENOVO.png"},
	{id:"2", name:"Phones", value:"phones", image:"https://jobcompass.net/wp-content/uploads/2020/03/Sell-Your-Old-Cell-Phone-To-Both-Online-and-Offline.jpg"},
	{id:"3", name:"TVs", value:"tvs", image:"https://mastertechhome.com/wp-content/uploads/2020/02/smart-tvs.jpg"},
      ]

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function HomePage2() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%', marginTop:'1rem' }}>
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
                position: 'relative',
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

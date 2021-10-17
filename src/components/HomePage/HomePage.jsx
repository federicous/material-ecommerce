import { Typography, Button, CardActionArea, Card, CardMedia, CardContent, Container } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom';

const HomePage = () => {
	const navList =[
		{id:"1", name:"Laptops", value:"abcat0502000", image:"https://assets.cybermonday.com.ar/uploads/tips/97/orig-1603762372LENOVO.png"},
		{id:"2", name:"Phones", value:"pcmcat209400050001", image:"https://jobcompass.net/wp-content/uploads/2020/03/Sell-Your-Old-Cell-Phone-To-Both-Online-and-Offline.jpg"},
		{id:"3", name:"TVs", value:"abcat0101000", image:"https://mastertechhome.com/wp-content/uploads/2020/02/smart-tvs.jpg"},
	      ]
	return (
    <>
    			<Typography variant={"h4"}>Categorias</Typography>

      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {navList.map((item) => (
          <Link key={item.id} to={`/category/${item.value}`}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.image}
                    alt="green iguana"
                  />
                  <CardContent>
              <Button variant="text">{item.name}</Button>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
          </Link>
        ))}
      </Container>
    </>
  );
}

export default HomePage

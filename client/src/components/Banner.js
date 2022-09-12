import {Box, Container, Typography} from "@mui/material";
import React from 'react';
import Carousel from "./Carousel";

const Banner = () => {
  return (
     <Container
        sx={{
          height        : 400,
          display       : 'flex',
          flexDirection : 'column',
          paddingTop    : 15,
          justifyContent: 'space-around',
          fontFamily    : 'Montserrat'
        }}
     >
       <Box
          sx={{
            display: 'flex',
            height: '40%',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center'
          }}>
         <Typography
            variant={'h2'}
            sx={{
              fontWeight: 'bold',
              marginBottom: 1,
            }}
         >
            Crypto Tracker
         </Typography>
         <Typography
            variant={'subtitle2'}
            sx={{
              color: 'darkgrey',
              textTransform: 'capitalize',
              marginBottom:10,
              fontSize:20
            }}
         >
           Gather data on your favorite crypto
         </Typography>
       </Box>
       <Carousel/>
     </Container>
  )
}
export default Banner;

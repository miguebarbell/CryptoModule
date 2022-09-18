import {Box, Container, Typography} from "@mui/material";
import React from 'react';


const Banner = () => {

  return (
     <Container
        sx={{
          height        : 400,
          display       : 'flex',
          flexDirection : 'column',
          paddingTop    : 15,
          justifyContent: 'space-around',
        }}
     >
       <Box
          sx={{
            display       : 'flex',
            height        : '40%',
            flexDirection : 'column',
            justifyContent: 'center',
            textAlign     : 'center',
          }}
       >
         <Typography
            variant={'h2'}
            sx={{
              fontWeight  : 'bold',
              marginBottom: 1,
              fontFamily  : 'Chakra Petch',
              color:'lightgrey'
            }}
         >
            Digital Assets
         </Typography>
         <Typography
            variant={'subtitle2'}
            sx={{
              color        : 'blue',
              textTransform: 'capitalize',
              marginBottom : 10,
              fontSize     : 20,

              fontFamily: 'Chakra Petch'
            }}
         >
           Gather data on trending cryptocurrency
         </Typography>
       </Box>

       {/*<Carousel/>*/}
     </Container>
  )
}
export default Banner;

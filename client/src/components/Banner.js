import React from 'react'
import {Box, Container, Typography} from "@mui/material";
import Carousel from "./Carousel";

const Banner = () => {
  return (
     <Container
        sx={{
          height: 400,
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 25,
          justifyContent: 'space-around'
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
              fontFamily: 'Monsterrat'
            }}
         >
            Crypto Currency
         </Typography>
         <Typography
            variant={'subtitle2'}
            sx={{
              color: 'darkgrey',
              textTransform: 'capitalize',
              fontFamily: 'Monsterrat',
              marginBottom:10
            }}
         >
           Get all the info regarding you favorite crypto
         </Typography>
       </Box>
       <Carousel/>
     </Container>
  )
}
export default Banner;
import React, {useEffect, useState} from 'react'
import {Box, Link} from "@mui/material";
import axios from "axios";
import {TrendingCoins} from "../config/api";
import AliceCarousel from "react-alice-carousel";

const Carousel = () => {

  const [trending, setTrending] = useState([])

  const fetchTrendingCoins = async () => {
    const {data} = await axios.get(TrendingCoins(curr))
    setTrending(data)
  }

  const curr = 'usd'
  // console.log(trending)
  useEffect(() => {
    fetchTrendingCoins();
  }, [curr])

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h > 0;
    return (
       <Link to={`/coins/${coin.id}`}
             sx={{
               textDecoration: 'none',
               color: 'gold',
               display:'flex',
               flexDirection:'column',
               alignItems:'center',
               cursor:'pointer',
               textTransform:'uppercase'
             }}>
         <img
            src={coin?.image}
            alt={coin?.name}
            height={'80'}
            style={{marginBottom: 10}}
         />
         <span>{coin?.symbol}
           &nbsp;
           <span
           style={{
             color: profit > 0 ? '#00FF00' : 'red',
             fontWeight: 500
           }}
           >
             {profit && '+'} {coin?.price_change_percentage_24h?.toFixed(2)}%
           </span>
         </span>
       </Link>
    )
  })
  const responsiveness = {
    0: {
      items: 2
    },
    512: {
      items: 4
    }
  }
  return (
     <Box
        sx={{
          height: '50%',
          display: 'flex',
          alignItems: 'center'
        }}>
       <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          disableButtonsControls
          responsive={responsiveness}
          autoPlay
          items={items}
       />
     </Box>
  )
}
export default Carousel;
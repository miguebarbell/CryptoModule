import React, {useEffect, useState} from 'react'
import axios from "axios";
import {CoinList} from "../config/api";
import {
  Container,
  LinearProgress, Pagination, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
  TextField,
  Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState();
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1);
  const history = useNavigate();

  const curr = 'usd';

  const fetchCoins = async () => {
    setLoading(true);
    const {data} = await axios.get(CoinList(curr));
    setCoins(data);
    setLoading(false);
  }
  useEffect(() => {
       fetchCoins();
     }, [curr]
  );

  const handleSearch = () => {
    return coins.filter(
       (coin) =>
          coin.name.toLowerCase().includes(search) ||
          coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
     <Container style={{textAlign: 'center'}}
                sx={{marginTop: 5}}>
       <Typography variant={'h4'}
                   style={{margin: 18, fontFamily: 'Monsterrat'}}>
         Cryptocurrency Prices by Market Cap
       </Typography>
       <TextField label={'search for crypto..'}
                  variant={'outlined'}
                  sx={{marginBottom: 5, width: '100%'}}
                  onChange={(e) => setSearch(e.target.value)}
       />
       <TableContainer>
         {
           loading ? (
              <LinearProgress sx={{backgroundColor: 'gold'}}/>
           ) : (
              <Table>
                <TableHead sx={{backgroundColor: '#6fb1de', borderRadius: 5}}>
                  <TableRow>
                    {
                      ['Coin', '24h Change', 'Market Cap', 'Market Cap Rank', 'Price'].map((head) => (
                         <TableCell
                            sx={{
                              fontWeight: '700',
                              color: 'black'
                            }}
                            key={head}
                            align={head === "Coin" ? "left" : "right"}
                         >
                           {head}
                         </TableCell>
                      ))}
                  </TableRow>
                </TableHead>
                  <TableBody>
                    {handleSearch()
                       .slice((page-1) * 10, (page-1) * 10 + 10)
                       .map((row) => {
                      const profit = row.price_change_percentage_24h > 0;
                      return (
                         <TableRow
                            onClick={() => history(`/coins/${row.id}`)}
                            key={row.name}
                         sx={{
                           cursor:'pointer',
                           '&:hover': {
                             background:'#dfe6e0'
                           }
                         }}
                         >
                           <TableCell
                              component={'th'}
                              scope={'row'}
                              sx={{
                                display: 'flex',
                                gap: 2
                              }}
                           >
                               <img
                                  src={row?.image}
                                  alt={row.name}
                                  height={'50'}
                                  style={{marginBottom: 10}}
                               />
                               <div
                                  style={{
                                    display: 'flex', flexDirection: 'column'}}
                               >
                               <span
                                  style={{
                                    textTransform: 'uppercase',
                                    fontSize: 22
                                  }}
                               >
                                 {row.symbol}
                               </span>
                                 <span style={{color: 'darkgray'}}>{row.name}</span>
                               </div>
                           </TableCell>
                           <TableCell
                              align={'right'}
                              sx={{
                                color: profit > 0 ? 'rgb(14,203,129)' : 'red',
                                fontWeight: 500
                              }}
                           >
                             {profit && '+'}
                             {row.price_change_percentage_24h.toFixed(2)}%
                           </TableCell>
                           <TableCell align={'right'}>
                            $ {numberWithCommas(row.market_cap.toString())}
                           </TableCell>
                           <TableCell align={'right'}>
                             {row.market_cap_rank}
                           </TableCell>
                           <TableCell align={'right'}>
                            $ {numberWithCommas(row.current_price.toFixed(2))}
                           </TableCell>
                         </TableRow>
                      )
                    })}
                  </TableBody>
              </Table>
           )
         }
       </TableContainer>
       <Pagination
          sx={{
            pt: 5,
            pr:10,
            pb:5,
            pl:10,
            width:'100%',
            display:'flex',
            justifyContent:'center'
          }}
          count={parseInt((handleSearch()?.length /10).toFixed(0))}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0,450);
          }}
       />
     </Container>
  )
}
export default CoinsTable;
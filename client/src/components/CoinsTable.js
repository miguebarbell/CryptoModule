import {
  Container,
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import axios from "axios";
import React, {useEffect, useState} from 'react';

import {CoinList} from "../config/api";
import {createOrUpdateUser, findUser} from "../data/queries";


export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = ({user, reload}) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState();
  const [search, setSearch] = useState('');

// PAGINATION
  const [page, setPage] = useState(1);


  const curr = 'usd';

  const fetchCoins = async () => {
    setLoading(true);
    const {data} = await axios.get(CoinList(curr));
    setCoins(data);
    setLoading(false);
  }
  useEffect(() => {
              fetchCoins();
              findUser(user).then(response => {
                setSelectedCurrencies(response.data.cryptoFindUser.currencies);
                // console.log("getting preferences from server");
              });
            }, [curr]
  );


  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const [selectedCurrencies, setSelectedCurrencies] = useState([]);
  // useEffect(()=> {
  //   handleSearch()
  // },[selectedCurrencies])

  const handleUpdateCurrencies = (symbol) => {
    // todo: put a limit to the number of currencies to follow
    if (selectedCurrencies.filter(currency => currency === symbol.toUpperCase()).length === 1) {
      // console.log("deleting currency " + symbol);
      const index = selectedCurrencies.findIndex(currency => currency === symbol.toUpperCase());
      selectedCurrencies.splice(index, 1);
      setSelectedCurrencies(selectedCurrencies);
      reload(false);
    } else {
      // console.log("adding " + symbol);
      selectedCurrencies.push(symbol.toUpperCase());
      setSelectedCurrencies(selectedCurrencies);
      reload(false);
    }
    const response = createOrUpdateUser(user, selectedCurrencies);
    // response.then(() => setHackyUpdate(hackyUpdate + 1))
  };
  // const [hackyUpdate, setHackyUpdate] = useState(0)
  return (
    <Container style={{textAlign: 'center'}}
               sx={{marginTop: 5}}>
      <Typography variant={'h4'}
                  style={{margin: 18, fontFamily: 'Montserrat'}}>
        {/*Cryptocurrency Prices by Market Cap*/}
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
                <TableHead sx={{backgroundColor: '#97b0ba', borderRadius: 5}}>
                  <TableRow>
                    {
                      ['Coin', '24h Change', 'Market Cap', 'Rank', 'Price'].map((head) => (
                        <TableCell

                          // align={'center'}
                          sx={{
                            fontWeight: '700',
                            color     : 'black',
                            fontFamily: 'Chakra Petch'
                          }}
                          key={head}
                          // align={head === "Coin" ? "" : "right"}
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

                          align={'center'}
                          onClick={() => handleUpdateCurrencies(row.symbol)}
                          key={row.name}
                          sx={{
                            cursor    : 'pointer',
                            background: (selectedCurrencies.filter(currency => currency === row.symbol.toUpperCase()).length === 1) && '#D9F8C4',

                            '&:hover': {
                              background: '#DFE6E0'
                            }
                          }}
                         >
                           <TableCell
                             component={'th'}
                             scope={'row'}
                             align={'center'}
                             sx={{
                               display   : 'flex',
                               gap       : 2,
                               fontFamily: 'Chakra Petch'
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
                             align={'left'}
                             sx={{
                               color     : profit > 0 ? 'rgb(14,203,129)' : 'red',
                               fontWeight: 500,
                               fontFamily: 'Chakra Petch'
                             }}
                           >
                             {profit && '+'}
                             {row.price_change_percentage_24h.toFixed(2)}%
                           </TableCell>
                          <TableCell align={'left'} sx={{fontFamily: 'Chakra Petch'}}>
                            $ {numberWithCommas(row.market_cap.toString())}
                          </TableCell>
                          <TableCell align={'left'} sx={{fontFamily: 'Chakra Petch'}}>
                            {row.market_cap_rank}
                          </TableCell>
                          <TableCell align={'left'} sx={{fontFamily: 'Chakra Petch'}}>
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

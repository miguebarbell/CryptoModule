import {Container} from "@mui/material";
import {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import {availableCurrencies, cryptoDaily, cryptoNews, findUser} from "./data/queries";
import CoinPage from "./Pages/CoinPage";
import Homepage from "./Pages/Homepage";

function App() {
  // const userFromSecurity = "crypto@maniac.gov";
  const userFromSecurity = "jerry0@usmc.gov";

  const defaultCurrencies = ["ETH", "SOL"];
  const [cryptoUser, setCryptoUser] = useState({username: userFromSecurity, currencies: defaultCurrencies});
  const [cryptoAvailableCurrencies, setcryptoAvailableCurrencies] = useState(defaultCurrencies);
  const [cryptoDailyValues, setcryptoDailyValues] = useState([{}]);
  const [news, setNews] = useState([]);
  useEffect(() => {
    findUser(userFromSecurity).then(result => {
      setCryptoUser(result.data.cryptoFindUser);
      let currenciesArrayString = "[";
      result.data.cryptoFindUser.currencies.map(currency => {
        currenciesArrayString += `"${currency}" ,`;
        cryptoDaily(currency).then(values => {
          cryptoDailyValues[currency] = values.data.cryptoDaily;
          setcryptoDailyValues(cryptoDailyValues);
        });
      });
      currenciesArrayString += "]";
      cryptoNews(currenciesArrayString).then(result => setNews(result.data.cryptoNews));
    });
    availableCurrencies().then(currencies => setcryptoAvailableCurrencies(currencies.data.cryptoAvailableCurrencies));
  }, []);
  console.log(cryptoUser.currencies);
  console.log(cryptoAvailableCurrencies);
  console.log(cryptoDailyValues);
  console.log(news);

  return (
    <Container
      sx={{
        backgroundColor: '#FFF',
        color          : 'black',
        minHeight      : '100vh'
      }}
    >
      <Header/>
       {/*<nav>*/}
       {/*  <ul>*/}
       {/*    <li>*/}
       {/*      <Link to={'/'}>home link</Link>*/}
       {/*    </li>*/}
       {/*    <li>*/}
       {/*      <Link to={'/coins'}>coins link</Link>*/}
       {/*    </li>*/}
       {/*  </ul>*/}
       {/*</nav>*/}
       <Routes>
         <Route exact path={'/'} element={<Homepage/>}/>
         <Route path={'/coins/:id'} element={<CoinPage/>}/>

       </Routes>
     </Container>
  );

}

export default App;

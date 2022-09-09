import "./App.css"
import {Route, Routes, Link} from "react-router-dom";
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";
import Header from "./components/Header";
import {Container} from "@mui/material";

function App() {

  return (
     <Container
        sx={{
          backgroundColor: '#fff',
          color: 'black',
          minHeight: '100vh'
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

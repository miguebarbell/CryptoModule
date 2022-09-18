import {Container} from "@mui/material";
import {useEffect, useState} from "react";
import WebFont from 'webfontloader';
import "./App.css";
import Banner from "./components/Banner";
import BarChart from "./components/BarChart";
import Chart from "./components/Chart";
import CoinsTable from "./components/CoinsTable";
import PleaseLogin from "./components/PleaseLogin";
import Image from "./img/two.jpg";

function App() {
  // const userFromSecurity = "crypto@maniac.gov";
  // const userFromSecurity = "jerry@usmc.gov";
  // const userFromSecurity = "";
  const userFromSecurity = "miguel@debloat.us";
  const [reload, setReload] = useState(true);
  useEffect(() => {
    WebFont.load({
                   google: {
                     families: ['Montserrat', 'Chakra Petch']
                   }
                 });
  }, []);
  useEffect(() => {
    setReload(true);
  }, [reload]);
  return (
    <Container
      sx={{
        backgroundColor: '#FFF',
        color          : 'black',
        minHeight      : '100vh',

        backgroundImage: `url(${Image})`
      }}
    >{userFromSecurity ?
      <>
        <Banner/>
        <BarChart/>
        <Chart user={userFromSecurity} reload={reload}/>
        <CoinsTable user={userFromSecurity} reload={setReload}/>

      </> :
      <PleaseLogin/>
    }
    </Container>
  );

}

export default App;

import {Container} from "@mui/material";
import {useEffect, useState} from "react";
import "./App.css";
import Banner from "./components/Banner";
import Chart from "./components/Chart";
import CoinsTable from "./components/CoinsTable";

function App() {
  // const userFromSecurity = "crypto@maniac.gov";
  // const userFromSecurity = "jerry@usmc.gov";
  // const userFromSecurity = "";
  const userFromSecurity = "miguel@debloat.us";
  const [reload, setReload] = useState(true);
  useEffect(() => {
    setReload(true);
  }, [reload]);
  return (
    <Container
      sx={{
        backgroundColor: '#FFF',
        color          : 'black',
        minHeight      : '100vh'
      }}
    >{userFromSecurity ?
      <>
        <Banner/>
        <Chart user={userFromSecurity} reload={reload}/>
        <CoinsTable user={userFromSecurity} reload={setReload}/> </> :
      <h1>Please Login</h1>
    }
    </Container>
  );

}

export default App;

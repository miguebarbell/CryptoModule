import {Container} from "@mui/material";
import "./App.css";
import Banner from "./components/Banner";
import Chart from "./components/chart";
import CoinsTable from "./components/CoinsTable";

function App() {
  // const userFromSecurity = "crypto@maniac.gov";
  // const userFromSecurity = "jerry@usmc.gov";
  // const userFromSecurity = "";
  const userFromSecurity = "miguel@debloat.us";
  return (
    <Container
      sx={{
        backgroundColor: '#FFF',
        color          : 'black',
        minHeight      : '100vh'
      }}
    >
      {/*<Header/>*/}
      <Chart user={userFromSecurity}/>
      <Banner/>
      <CoinsTable/>
    </Container>
  );

}

export default App;

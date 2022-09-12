import "./App.css"
import {Route, Routes} from "react-router-dom";
import Homepage from "./Pages/Homepage";
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
       <Routes>
         <Route exact path={'/'} element={<Homepage/>}/>
       </Routes>
     </Container>
  );

}

export default App;

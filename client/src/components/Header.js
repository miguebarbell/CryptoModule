import React from 'react'
import {AppBar, Container, Toolbar, Typography} from "@mui/material";


const Header = () => {

  return (
     <AppBar color="transparent" position="static">
       <Container>
         <Toolbar>
           <Typography
              sx={{
                flex: 1,
                color: 'darkgreen',
                fontFamily: 'Monsterrat',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
           >
             Quintrix Budgeting App
           </Typography>
         </Toolbar>
       </Container>
     </AppBar>
  )
}
export default Header;
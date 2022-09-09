import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";
import {BrowserRouter} from "react-router-dom";

import 'react-alice-carousel/lib/alice-carousel.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
     <DevSupport ComponentPreviews={ComponentPreviews}
                 useInitialHook={useInitial}>
       <BrowserRouter>
         <App/>
       </BrowserRouter>
     </DevSupport>
   </React.StrictMode>);

import React, { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from '../../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Topbar } from '../general/top-bar';
import Students from '../sections/students';
import { SidebarC } from '../general/side-bar';
import Dashboard from '../sections/dashboard';
const Index: React.FC =()=>{
  const [theme,colorMode]= useMode();
  const [isSidebar, setIsSidebar] = useState(true);
return(
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        
        <div className='app'>
        <SidebarC />
          <main className='content'>
           <Topbar />
           
           <Routes>
            <Route path="/" element={<Dashboard/>}></Route>
            <Route path="/students" element={<Students/>}></Route>
           </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>

  
  
);
}

export default Index;
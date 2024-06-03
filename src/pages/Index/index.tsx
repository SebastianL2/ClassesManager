import React, { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from '../../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Topbar } from '../general/top-bar';
import Students from '../sections/students';
import { SidebarC } from '../general/side-bar';
import Dashboard from '../sections/dashboard';
import Teachers from '../sections/teachers';
import Classes from '../sections/classes';
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
            <Route path="/teachers" element={<Teachers/>}></Route>
            <Route path="/classes" element={<Classes/>}></Route>
           </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>

  
  
);
}

export default Index;
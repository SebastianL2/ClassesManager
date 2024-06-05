import React from 'react'
import { Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from '../../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Topbar } from '../general/top-bar';
import Students from '../sections/students';
import { SidebarC } from '../general/side-bar';
import Dashboard from '../sections/dashboard';
import Teachers from '../sections/teachers';
import Classes from '../sections/classes';
import  AddTeachers  from '../sections/add-user-class';
import { GlobalStateProvider } from '../general/global/GlobalStateContext';
const Index: React.FC =()=>{
  const [theme,colorMode]= useMode();
return(
  
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <GlobalStateProvider>
        <div className='app'>
        <SidebarC />
          <main className='content'>
           <Topbar />
           
           <Routes>
            <Route path="/" element={<Dashboard/>}></Route>
            <Route path="/students" element={<Students/>}></Route>
            <Route path="/teachers" element={<Teachers/>}></Route>
            <Route path="/classes" element={<Classes/>}></Route>
            <Route path="/add-teachers" element={<AddTeachers/>}></Route>
           </Routes>
          </main>
        </div>
        </GlobalStateProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>

  
  
);
}

export default Index;
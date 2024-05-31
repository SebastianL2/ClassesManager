import React from 'react'

import { ColorModeContext, useMode } from '../../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Topbar } from '../general/top-bar';

const Index: React.FC =()=>{
  const [theme,colorMode]= useMode();
return(
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        
        <div className='app'>
          <main className='content'>
           <Topbar/>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>

  
  
);
}

export default Index;
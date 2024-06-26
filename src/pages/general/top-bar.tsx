import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";

import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { ColorModeContext, palette } from "../../theme";


export const Topbar: React.FC =()=>{
    const theme = useTheme();
    const colors = palette(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
  
  return (
    <Box
     display="flex" 
     justifyContent="space-between" 
     p={2}
     sx={{backgroundColor:colors.primary[400]}}
     >
    
    <Box
      display="flex"
      sx={{
        border: `2px solid ${colors.grey[200]}`,
      }}
      borderRadius="8px"
    >
      <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
      <IconButton type="button" sx={{ p: 1 }}>
        <SearchIcon />
      </IconButton>
    </Box>


    <Box display="flex">
      <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === "dark" ? (
          <DarkModeOutlinedIcon />
        ) : (
          <LightModeOutlinedIcon />
        )}
      </IconButton>
      <IconButton>
        <NotificationsOutlinedIcon />
      </IconButton>
      <IconButton>
        <SettingsOutlinedIcon />
      </IconButton>
      <IconButton>
        <PersonOutlinedIcon />
      </IconButton>
    </Box>
  </Box>

  )
}

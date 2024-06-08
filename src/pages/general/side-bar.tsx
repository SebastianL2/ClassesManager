import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { palette } from '../../theme';
import { GroupAddOutlined, SchoolOutlined } from '@mui/icons-material';


interface SidebarCProps {
  title: string;
  to: string;
  icon: React.ReactNode;
  selected: string;
  setSelected: (selected: string) => void;
}


const Item: React.FC<SidebarCProps> = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = palette(theme.palette.mode);
  
  return (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      
        
        {title}
      
    </MenuItem>
    </Link>
  );
};
export const SidebarC: React.FC =()=>{
  const theme = useTheme();
  const colors= palette(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  return (
    <Box>
    <Sidebar 
    
    collapsed={isCollapsed}
    rootStyles={{
      [`.${sidebarClasses.container}`]: {
        backgroundColor: `${colors.primary[400]} !important`,
      },
      [`.${sidebarClasses.container} .pro-inner-item:hover`]: {
        color: "#868dfb !important", // Cambia esto al color que desees
      },
    }}
    >
      <Menu
        menuItemStyles={{
          button: ({ level, active }) => {
            if (level === 0) {
              return {
                
                color: active ?  `${colors.blueAccent[300]} !important` : undefined,
                "&:hover": {
                   backgroundColor: `${colors.grey[800]} !important`,
                   color:  `${colors.grey[100]} !important`,
                   borderRadius: "8px !important",
                   fontWeight: "bold !important"
                 },
              };
            }
          },
        }}
      >
      
        <MenuItem
          onClick={() => setIsCollapsed(!isCollapsed)}
          icon={isCollapsed ?  <svg width="34px" height="34px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.78272 3.49965C11.2037 2.83345 12.7962 2.83345 14.2172 3.49965L20.9084 6.63664C22.3639 7.31899 22.3639 9.68105 20.9084 10.3634L14.2173 13.5003C12.7963 14.1665 11.2038 14.1665 9.78281 13.5003L3.0916 10.3634C1.63613 9.68101 1.63614 7.31895 3.0916 6.63659L6 5.27307" stroke={colors.grey[100]} stroke-width="1.5" stroke-linecap="round"></path> <path d="M2 8.5V14" stroke={colors.grey[100]} stroke-width="1.5" stroke-linecap="round"></path> <path d="M12 21C10.204 21 7.8537 19.8787 6.38533 19.0656C5.5035 18.5772 5 17.6334 5 16.6254V11.5M19 11.5V16.6254C19 17.6334 18.4965 18.5772 17.6147 19.0656C17.0843 19.3593 16.4388 19.6932 15.7459 20" stroke={colors.grey[100]} stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
          : undefined}
          style={{
            margin: "10px 0 20px 0",
            color: colors.grey[100],
          }}
        >
          {!isCollapsed && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              ml="15px"
            >
              <svg width="34px" height="34px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.78272 3.49965C11.2037 2.83345 12.7962 2.83345 14.2172 3.49965L20.9084 6.63664C22.3639 7.31899 22.3639 9.68105 20.9084 10.3634L14.2173 13.5003C12.7963 14.1665 11.2038 14.1665 9.78281 13.5003L3.0916 10.3634C1.63613 9.68101 1.63614 7.31895 3.0916 6.63659L6 5.27307" stroke={colors.grey[100]} stroke-width="1.5" stroke-linecap="round"></path> <path d="M2 8.5V14" stroke={colors.grey[100]} stroke-width="1.5" stroke-linecap="round"></path> <path d="M12 21C10.204 21 7.8537 19.8787 6.38533 19.0656C5.5035 18.5772 5 17.6334 5 16.6254V11.5M19 11.5V16.6254C19 17.6334 18.4965 18.5772 17.6147 19.0656C17.0843 19.3593 16.4388 19.6932 15.7459 20" stroke={colors.grey[100]} stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
              
             <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                <MenuOutlinedIcon />
              </IconButton>
            </Box>
          )}
        </MenuItem>


        <Box   sx={{ 
       minHeight: '145vh', 
       paddingLeft: isCollapsed ? undefined : '10%'
        }}>
          <Item
            title="Dashboard"
            to="/"
            icon={<HomeOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />

          <Typography
            variant="h6"
            color={colors.grey[300]}
            sx={{ m: "15px 0 5px 20px" }}
          >
            Data
          </Typography>
          <Item
            title="Students"
            to="/students"
            icon={<PeopleOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Teachers"
            to="/teachers"
            icon={<ContactsOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Classes"
            to="/classes"
            icon={<ReceiptOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />

          <Typography
            variant="h6"
            color={colors.grey[300]}
            sx={{ m: "15px 0 5px 20px" }}
          >
            Asign classes
          </Typography>
          <Item
            title="Add Teachers"
            to="/add/teachers"
            icon={<SchoolOutlined />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Add Sttudents"
            to="/add/students"
            icon={<GroupAddOutlined />}
            selected={selected}
            setSelected={setSelected}
          />

          <Item
            title="Profile"
            to="/form"
            icon={<PersonOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />

          <Typography
            variant="h6"
            color={colors.grey[300]}
            sx={{ m: "15px 0 5px 20px" }}
          >
            Schedule
          </Typography>
          <Item
            title="Calendar"
            to="/bar"
            icon={<CalendarTodayOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
        </Box>
      </Menu>
    </Sidebar>
  </Box>
  )
}


import {  Avatar, Button,IconButton, List, ListItem, ListItemAvatar, ListItemText, SvgIcon, useTheme } from "@mui/material";
import {  useEffect, useState } from "react";
import {  palette } from "../../theme";
import { fetchData } from "../../API/general-http-request";
import { useGlobalState } from "./global/GlobalStateContext";

interface DataItem {
  id: string;
  name?: string;
  description?: string;
  last_name?: string;
  url?:string;
  email?: string;
}

export const ListButton: React.FC<{urlPlus:string}> =({urlPlus})=>{
    const theme = useTheme();
    const colors = palette(theme.palette.mode);
    const [dataItems, setDataItems] = useState<DataItem[]>([]);
    const {setData} = useGlobalState();
    const {setData2} = useGlobalState();

  
   useEffect(() => {
    const getData = async () => {
      const data = await fetchData(urlPlus);
      setDataItems(data);
      
      
      
    };
    getData();
  }, []);

  const saveId = async (id: string) => {
    setData("");
    setData2("");
    
    setData(id);
    setData2(id);
  };
  return (

    <List sx={{ width: '100%', maxWidth: 460}}>
      {dataItems && dataItems.map((dataItem, index) => {
        const hasDivider = index < dataItems.length - 1;

        return (
          <Button 
          onClick={() => saveId(dataItem.id)} 
          key={dataItem.id} sx={{ width: '100%' }}
          >
            <ListItem divider={hasDivider} key={dataItem.id} alignItems="center">
              <ListItemAvatar>
              <Avatar src={dataItem.url} alt="Avatar" sx={{ width: 52, height: 52, borderRadius: 2 }}/>
              </ListItemAvatar>

              <ListItemText
                primary={dataItem.name+' '+ (dataItem.last_name ? ' ' + dataItem.last_name : '')}
                primaryTypographyProps={{ 
                  variant: 'h3', 
                  color: `${colors.grey[100]}`,     
                }}
                secondary={'id: '+dataItem.id}
                secondaryTypographyProps={{ 
                  variant: 'body2',    
                  color: 'textSecondary', 
                }}
              />
            </ListItem>
            <IconButton edge="end">
              <SvgIcon />
            </IconButton>
          </Button>
        );
      })}
    </List>
   
 


  

  )
}

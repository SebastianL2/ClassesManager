import { Avatar, Box, Button, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, SvgIcon, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext, palette } from "../../theme";
import { fetchData } from "../../API/general-http-request";

interface DataItem {
  id: string;
  name?: string;
  description?: string;
  last_name?: string;
  images?: {
      secure_url: string;
    };
  email?: string;
}

export const ListButton: React.FC =()=>{
    const theme = useTheme();
    const colors = palette(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const [dataItems, setDataItems] = useState<DataItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const [url, setUrl] = useState('');
    const [galery, setGalery] = useState([]);

  
   useEffect(() => {
    const getData = async () => {
      const data = await fetchData('teachers');
      setDataItems(data);
   
      
      
    };
    getData();
  }, []);

  const saveId = async (id: string) => {
    
    localStorage.setItem('selectedId', id);
   
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
                <Box
                  component="img"
                  src="https://img.freepik.com/premium-photo/librarian-digital-avatar-generative-ai_934475-9092.jpg"
                  sx={{
                    borderRadius: 1,
                    height: 48,
                    width: 48,
                  }}
                />
              </ListItemAvatar>

              <ListItemText
                primary={dataItem.name+' '+dataItem.last_name}
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

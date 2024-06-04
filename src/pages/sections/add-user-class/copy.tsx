import React, { useEffect, useState } from 'react';
import {
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  SvgIcon,
  Stack,
  Typography,
} from '@mui/material';
import { Box, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { fetchData } from '../../../API/general-http-request';
import Header from '../../general/header';
import { useTheme } from '@emotion/react';
import { palette } from '../../../theme';

interface DataItem {
    id?: string;
    name?: string;
    description?: string;
    last_name?: string;
    images?: {
        secure_url: string;
      };
    email?: string;
}

export const AddTeachers: React.FC = () => {
  const [dataItems, setDataItems] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState('');
  const [url, setUrl] = useState('');
  const [galery, setGalery] = useState([]);

  
  useEffect(() => {
    const getData = async () => {
      const data = await fetchData('teachers');
      setDataItems(data);
      console.log("datos",data);
      console.log(data[0].name);
      
      
    };
    getData();
  }, []);

  const saveId = async (ide: string, secure_url: string) => {
    console.log("Selected ID: ", ide);
    setId(ide);
    setUrl(secure_url);

    try {
      setLoading(true);
      const response = await fetch(`/galery/${ide}`);
      const galeryData = await response.json();
      setGalery(galeryData.galerys);
      setLoading(false);
      console.log("Galery data:", galeryData);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching galery data:', error);
    }
  };

  return (
    
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
         <Header title="TEACHERS ADD SECTION" subtitle="Add and see the teachers asign to a class " />
          <List>
            {dataItems.map((dataItem, index) => {
              const hasDivider = index < dataItems.length - 1;

              return (
                <Button >
                  <ListItem divider={hasDivider} key={dataItem.id}>
               
                    <ListItemText
                      primary={dataItem.name}
                      primaryTypographyProps={{ variant: 'subtitle1' }}
                      secondary={`Updated ago`}
                      secondaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                  <IconButton edge="end">
                    <SvgIcon />
                  </IconButton>
                </Button>
              );
            })}
          </List>
          <Divider />

        </Grid>

      </Grid>
 
  );
};

import React, { useEffect, useState }  from 'react';
import { Box, Grid, IconButton, Skeleton, Stack, Typography, useTheme } from '@mui/material';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import Header from '../../general/header';
import { palette } from '../../../theme';
import { GridAlignment, GridRenderCellParams } from '@mui/x-data-grid';
import { ListButton } from '../../general/list-button';
import { useGlobalState } from '../../general/global/GlobalStateContext';
import { PopUpWindow } from '../../material-ui/pop-up-ui';
import TableUi from '../../material-ui/table-ui';

const AddTeachers: React.FC = () => {
  const theme = useTheme();
  const colors = palette(theme.palette.mode);
  const { data: globalContextId } = useGlobalState();
  const [contextId, setContextId] = useState(globalContextId);

  interface Column {
    field: string;
    headerName: string;
    type?: 'number' | 'string';
    flex?: number;
    width?: number;
    align?:GridAlignment;
    headerAlign?:GridAlignment;
    renderCell?:(params: GridRenderCellParams) => React.ReactNode;
    editable?:boolean;
  }


  useEffect(() => {
    if (globalContextId === '') {
      setContextId(''); 
    } else {
      setContextId(globalContextId);
    }
  }, [globalContextId]);

    const columnsSections: Column[] = [
      { field: "id", headerName: "ID", type: "number", align: 'left', width: 150, headerAlign: 'left',editable: false  },
      { field: "name", headerName: "Name", align: 'left', headerAlign: 'left',editable: true },
      { field: "description", headerName: "Description", type: "string", width: 200, align: 'left', headerAlign: 'left',editable: true  },

    ];
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="TEACHERS SECTION" subtitle="See all the data of students " />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="34vh" 
        gap="20px"
      >
        {/* ROW 2 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          sx={{ backgroundColor: colors.primary[400],borderRadius: '8px' }}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              borderBottom: `4px solid ${colors.primary[500]}`,
              color: colors.grey[100]
            }}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h4" fontWeight="600">
              Teachers
            </Typography>

          </Box>
          
            <ListButton urlPlus='teachers' urlSrc='https://img.freepik.com/premium-photo/librarian-digital-avatar-generative-ai_934475-9092.jpg'/>
          
        </Box>
        <Box
          component="div"
          gridColumn="span 8"
          gridRow="span 2"
          sx={{ backgroundColor: colors.primary[400], borderRadius: '8px' }}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.grey[100]}
              >
               Classes Assigned to The Teacher
              </Typography>
              <Typography
                variant="h5"
                fontWeight="bold"
                color={colors.grey[300]}
              >
                Puedes editar haciendo doble click en la casilla luego dar click icono Guardar
                
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box p="2vh 30px">
            {contextId ? (
               <Box >
              <TableUi urlPlus='teachers'  urlPlus2={`classes/${contextId}/teacher`} columnsSections={columnsSections}  />
              <Box p="18vh 30px">
              <PopUpWindow urlPlus='classes' urlPlus2='assign-teacher' columnsSections={columnsSections}/>
              </Box>
              </Box>
            ) : (
              <Grid item xs={18} md={18} lg={18}>
                <Box display="flex" justifyContent="center" height="70vh">
                  <Stack spacing={1}>
                    <Skeleton variant="rectangular" width={'90vh'} height={'54vh'} />
                  </Stack>
                </Box>
              </Grid>
            )}
  
          </Box>

          
        </Box>
 
      </Box>
    </Box>

    
  );
}

export default AddTeachers;

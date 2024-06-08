import React from 'react';
import { Avatar, Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import Header from '../../general/header';
import TableUi from '../../material-ui/table-ui';
import { palette } from '../../../theme';
import FormClassses from '../../general/forms/form-classes';
import { GridAlignment, GridRenderCellParams } from '@mui/x-data-grid';
import { useGlobalState } from '../../general/global/GlobalStateContext';

const Classes: React.FC = () => {
  const theme = useTheme();
  const colors = palette(theme.palette.mode);
  const { update: updateParam } = useGlobalState();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
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


    const columnsSections: Column[] = [
      { field: "id", headerName: "ID", type: "number", align: 'left', headerAlign: 'left', width: 140,editable: false  },
      {
        field: 'url',
        headerName: 'cover',
        type: 'string',
        width: 60,
        align: 'left',
        headerAlign: 'left',
        editable: false,
        renderCell: (params) => (
        <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100%">
          <Avatar src={params.value} alt="Avatar" sx={{ width: 36, height: 36, borderRadius: 4 }}/>
        </Box>
        ),
      },
      { field: "name", headerName: "Name", align: 'left', headerAlign: 'left',editable: true },
      { field: "description", headerName: "Description", type: "string", width: 130, align: 'left', headerAlign: 'left',editable: true  },
      { field: "createdAt", headerName: "Create Date", type: "string", width: 100, align: 'left', headerAlign: 'left',editable: false  },

    ];
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="CLASSES SECTION" subtitle="See all the data of classes " />
        
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display={isMobile ? 'block' : 'grid'}
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows={isMobile ? '82vh' : '34vh'}
        gap="20px"
      >
        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          mb="2vh"
          gridRow="span 2"
          sx={{ backgroundColor: colors.primary[400],borderRadius: '8px' }}
          overflow="auto"
          p={2}
        >
            <Box mt={2}>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.grey[100]}
              >
               Classes Assigned to The Teacher
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                color={colors.grey[300]}
              >
                Puedes editar los datos haciendo doble click a la cassilla de la tabla y icono guardar
                
              </Typography>
            </Box>


              <Box p={2}>
              
              <TableUi urlPlus='students' columnsSections={[...columnsSections]} updateParam={updateParam}/>

              </Box>
 
          
        </Box>
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
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Create New Class
            </Typography>

          </Box>
          
           <FormClassses/>
          
        </Box>
      </Box>
    </Box>
  );
}

export default Classes;

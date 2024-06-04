import React from 'react';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import Header from '../../general/header';
import TableUi from '../../material-ui/table-ui';
import { palette } from '../../../theme';
import FormClassses from '../../general/forms/form-classes';
import { GridAlignment, GridRenderCellParams } from '@mui/x-data-grid';

const Classes: React.FC = () => {
  const theme = useTheme();
  const colors = palette(theme.palette.mode);
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
      { field: "id", headerName: "ID", type: "number", align: 'left', headerAlign: 'left',editable: false  },
      { field: "name", headerName: "Name", align: 'left', headerAlign: 'left',editable: true },
      { field: "description", headerName: "Description", type: "string", width: 100, align: 'left', headerAlign: 'left',editable: true  },
      { field: "createdAt", headerName: "Create Date", type: "string", width: 200, align: 'left', headerAlign: 'left',editable: false  },

    ];
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="CLASSES SECTION" subtitle="See all the data of classes " />
        
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="30vh" 
        gap="20px"
      >
        {/* ROW 2 */}
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
                color={colors.greenAccent[500]}
              >
                Classes Data
              </Typography>
              <Typography
                variant="h5"
                fontWeight="bold"
                color={colors.greenAccent[700]}
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
          <Box p="5px 30px">
            <TableUi urlPlus='classes' columnsSections={[...columnsSections]}/>
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
            <Typography color={colors.greenAccent[300]} variant="h5" fontWeight="600">
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

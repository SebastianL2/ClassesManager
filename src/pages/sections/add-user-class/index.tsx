import React, { useEffect, useState }  from 'react';
import { Box, Grid, IconButton, Skeleton, Stack, Typography, useTheme } from '@mui/material';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import Header from '../../general/header';
import { palette } from '../../../theme';
import { GridAlignment, GridRenderCellParams } from '@mui/x-data-grid';
import { ListButton } from '../../general/list-button';
import TableUi from '../../material-ui/table-ui';

const AddTeachers: React.FC = () => {
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
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem('selectedId');
    setSelectedId(id);
  }, []);

    const columnsSections: Column[] = [
      { field: "id", headerName: "ID", type: "number", align: 'left', headerAlign: 'left',editable: false  },
      { field: "name", headerName: "Name", align: 'left', headerAlign: 'left',editable: true },
      { field: "last_name", headerName: "LastName", type: "string", width: 100, align: 'left', headerAlign: 'left',editable: true  },
      { field: "email", headerName: "Email", type: "string", width: 200, align: 'left', headerAlign: 'left',editable: true  },

    ];
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="STUDENTS SECTION" subtitle="See all the data of students " />
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
              Add new Student 
            </Typography>

          </Box>
          
            <ListButton/>
          
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
                color={colors.greenAccent[500]}
              >
                Students Users System
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
          <Box p="15vh 30px">
          {selectedId  ? (
               <TableUi columnsSections={columnsSections} urlPlus='classes'/>
            ) : (
              <Grid item xs={18} md={18} lg={18}>
           
              <Box display="flex" justifyContent="center"  height="70vh">
                <Stack spacing={1}>
         
                  <Skeleton variant="rectangular" width={290} height={160} />
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

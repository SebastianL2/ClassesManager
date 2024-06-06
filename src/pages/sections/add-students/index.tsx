import React  from 'react';
import { Avatar, Box, Grid, IconButton, Skeleton, Stack, Typography, useTheme } from '@mui/material';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import Header from '../../general/header';
import { palette } from '../../../theme';
import { GridAlignment, GridRenderCellParams } from '@mui/x-data-grid';
import { ListButton } from '../../general/list-button';
import { useGlobalState } from '../../general/global/GlobalStateContext';
import { PopUpWindow } from '../../material-ui/pop-up-ui';
import TableUi from '../../material-ui/table-ui';

const AddStudents: React.FC = () => {
  const theme = useTheme();
  const colors = palette(theme.palette.mode);
  const { data2: contextId2 } = useGlobalState();
  const { update: updateParam } = useGlobalState();
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


  const columnsSections2: Column[] = [
    { field: "id", headerName: "ID", type: "number", align: 'left', width: 50, headerAlign: 'left',editable: false  },
    {
      field: 'url',
      headerName: 'avatar',
      type: 'string',
      width: 60,
      align: 'left',
      headerAlign: 'left',
      editable: false,
      renderCell: (params) => (
      <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100%">
        <Avatar src={params.value} alt="Avatar" />
      </Box>
      ),
    },
    { field: "name", headerName: "Name", align: 'left', width: 80, headerAlign: 'left',editable: true },
    { field: "last_name", headerName: "Last Name", type: "string", width: 80, align: 'left', headerAlign: 'left',editable: true  },
    { field: "email", headerName: "Eamil adress", type: "string", width: 140, align: 'left', headerAlign: 'left',editable: true  },

  ];


    const columnsSections: Column[] = [
      { field: "id", headerName: "ID", type: "number", align: 'left', width: 150, headerAlign: 'left',editable: false  },
      {
        field: 'url',
        headerName: 'avatar',
        type: 'string',
        width: 60,
        align: 'left',
        headerAlign: 'left',
        editable: false,
        renderCell: (params) => (
        <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100%">
          <Avatar src={params.value} alt="Avatar" />
        </Box>
        ),
      },
      { field: "name", headerName: "Name", align: 'left', width: 80, headerAlign: 'left',editable: true },
      { field: "last_name", headerName: "Last Name", type: "string", width: 80, align: 'left', headerAlign: 'left',editable: true  },
      { field: "email", headerName: "Eamil adress", type: "string", width: 140, align: 'left', headerAlign: 'left',editable: true  },
 
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
              Classes
            </Typography>

          </Box>
          
            <ListButton urlPlus='classes' />
          
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
               Students Assigned to the class
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
            {contextId2 ? (
               <Box >
              <TableUi urlPlus='students' urlPlus2={`classes/${contextId2}/students`} columnsSections={columnsSections}  updateParam={updateParam}/>
              <Box p="18vh 30px">
              <PopUpWindow extension='STUDENT' urlPlus='students' urlPlus2='assign-students' columnsSections={columnsSections2}/>
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

export default AddStudents;

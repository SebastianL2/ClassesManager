import React  from 'react';
import { Avatar, Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
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
  
        display={isMobile ? 'block' : 'grid'}
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows={isMobile ? '12vh' : '34vh'}
        gap="20px"
      >
        {/* ROW 2 */}
        <Box
          gridColumn="span 4"
          mb="2vh"
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
                Para ver las clasees relacionadas a los profesores dar click en alguno de ellos dela izquierda
                
              </Typography>
            </Box>


          {contextId2 ? (
              <Box p={2}>
              
              <TableUi urlPlus='students' urlPlus2={`classes/${contextId2}/students`} columnsSections={columnsSections}  updateParam={updateParam}/>
              <Box 
               mt={isMobile? "18vh":"32vh"} 
               >
              <PopUpWindow extension='STUDENT' urlPlus='students' urlPlus2='assign-students' columnsSections={columnsSections2}/>
              </Box>
              </Box>
            ) : (
              <Grid item xs={18} md={18} lg={18}>
                <Box display="flex" justifyContent="center" >
                   <Typography 
                     variant='h1' 
                     fontWeight="bold"
                     color={colors.grey[100]}
                    >
                     Select One Teacher
                   </Typography>
                </Box>
              </Grid>
            )}
          
        </Box>
 
      </Box>
    </Box>

    
  );
}

export default AddStudents;

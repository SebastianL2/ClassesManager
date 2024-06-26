import React, { useEffect, useState }  from 'react';
import { Avatar, Box, Grid, IconButton, Skeleton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
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


  useEffect(() => {
    if (globalContextId === '') {
      setContextId(''); 
    } else {
      setContextId(globalContextId);
    }
  }, [globalContextId]);

  const columnsSections2: Column[] = [
    { field: "id", headerName: "ID", type: "number", align: 'left', width: 80, headerAlign: 'left',editable: false  },
    { field: "name", headerName: "Name", align: 'left', headerAlign: 'left',editable: true },
    { field: "description", headerName: "Description", type: "string", width: 150, align: 'left', headerAlign: 'left',editable: true  },
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
  ];
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
        <Header title="TEACHERS SECTION" subtitle="See all the data of teacher classes " />
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
          
            <ListButton urlPlus='teachers' />
          
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
              <TableUi urlPlus='teachers'  urlPlus2={`classes/${contextId}/teacher`} columnsSections={columnsSections}  updateParam={updateParam}/>
              <Box mt={isMobile? "18vh":"32vh"} >
              <PopUpWindow extension='CLASS' urlPlus='classes' urlPlus2='assign-teacher' columnsSections={columnsSections2}/>
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

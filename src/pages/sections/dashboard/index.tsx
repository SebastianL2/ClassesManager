
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import Header from "../../general/header";
import { palette } from "../../../theme";
import { ListButton } from "../../general/list-button";
import TableUi from "../../material-ui/table-ui";
import { GridAlignment, GridRenderCellParams } from "@mui/x-data-grid";
import { AddReaction } from "@mui/icons-material";



const Dashboard = () => {
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

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

       
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="14vh"
        gap="20px"
      >
  

        <Box
          component="div"
          gridColumn="span 8"
          gridRow="span 2"
          sx={{ backgroundColor: colors.primary[400],borderRadius: 4 }} 
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box
              display="flex"
              alignItems="center"
              p={2}
            >
              <Avatar
                sx={{ bgcolor: colors.primary[500], width: 56, height: 56, mr: 2 }}
                alt="User Avatar"
                src="https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png" // Puedes colocar una URL real de una imagen aquí
              >
                U
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight="600" color={colors.grey[100]}>
                  John Doe
                </Typography>
                <Typography variant="h5" color={colors.grey[100]}>
                  johndoe@example.com
                </Typography>
                <Typography variant="h6" color={colors.grey[100]}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
                </Typography>
              </Box>
              
            </Box>
            <Box>
              <IconButton>
                <AddReaction
                  sx={{ fontSize: "26px", color: colors.greenAccent[500],borderRadius: 4 }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
           
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          sx={{ backgroundColor: colors.primary[400],borderRadius: 4 }} 
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
              Teachers
            </Typography>
          </Box>
          <ListButton urlPlus='teachers' urlSrc='https://img.freepik.com/premium-photo/librarian-digital-avatar-generative-ai_934475-9092.jpg'/>
          
        </Box>

     
      </Box>

      <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridAutoRows="24vh"
      gap="20px"
      sx={{ mt: 4, borderRadius: 34 }} 
    >
      

        <Box
          component="div"
          gridColumn="span 8"
          gridRow="span 2"
          sx={{ backgroundColor: colors.primary[400],borderRadius: 4 }} 
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                CLASSES LIST
              </Typography>
              
              
            </Box>
            <Box>
  
            </Box>
          </Box>
          <Box height="250px" p={4}>
          <TableUi urlPlus='classes' columnsSections={[...columnsSections]}/>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          sx={{ backgroundColor: colors.primary[400],borderRadius: 4 }} 
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
              Students
            </Typography>
          </Box>
          <ListButton urlPlus='students' urlSrc='https://cdn.pixabay.com/photo/2023/12/10/06/56/ai-generated-8440708_1280.png'/>
          
        </Box>

     
      </Box>
    </Box>
  );
};


export default Dashboard;
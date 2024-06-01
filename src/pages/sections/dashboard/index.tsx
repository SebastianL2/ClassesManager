
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';




const Dashboard = () => (
  

    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 2
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
       
        >
          <Grid
            xs={12}
            sm={6}
            lg={3}
          
          >
            <h1>Dashboard</h1>
        
          </Grid>
        </Grid>
        <Grid
          container
          spacing={3}
        
        >
          <Grid
            xs={12}
            sm={6}
            lg={3}
            sx={{
                backgroundColor: 'lightblue', // Define el color de fondo
              }}
            boxShadow={12}
          >
            <h1>Dashboard</h1>
        
          </Grid>
        </Grid>
      </Container>
    </Box>
  
);


export default Dashboard;
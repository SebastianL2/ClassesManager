import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';

export  const SnackBarAlert = ({ message,view,severity }: { message: string,view:boolean,severity:AlertColor }) => {
  const [open, setOpen] = React.useState(view);

 
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
         {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

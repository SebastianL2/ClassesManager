import { Box, IconButton, Typography, useTheme } from "@mui/material";
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import { palette } from "../../theme";
import { AddAlarm } from "@mui/icons-material";
import { useGlobalState } from "../general/global/GlobalStateContext";
import { GridAlignment, GridRenderCellParams } from "@mui/x-data-grid";
import TableUiAdd from "./table-ui-add";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
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


 



export const PopUpWindow: React.FC <{extension:string,urlPlus:string,urlPlus2:string,columnsSections:Column[]}> = ({extension,urlPlus,urlPlus2,columnsSections}) => {
    const theme = useTheme();
    const colors = palette(theme.palette.mode);
    const [open, setOpen] = React.useState(false);
    const { data: contextId } = useGlobalState();

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <React.Fragment>
        <Box
          sx={{ minHeight: '50vh'}}
        >
            <Box display="flex" justifyContent="center" mt="14vh">
              <Button
                onClick={handleClickOpen}
                sx={{
                  backgroundColor: colors.greenAccent[600],
                  color: colors.grey[100],
                  fontSize: "14px",
                  marginBottom: "10px",
                  fontWeight: "bold",
                  padding: "10px 10px",
                  transition: "background-color 0.3s ease",
                  '&:hover': {
                    backgroundColor: colors.greenAccent[500],
                  }
                }}
              >
                <AddAlarm sx={{ mr: "10px" }} />
                Add {extension}
              </Button>
            </Box>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          sx={{
            
            '& .MuiDialog-paper': {
              backgroundColor: colors.primary[900],
              minHeight: '70vh',
              maxHeight:'70vh',
              borderRadius:'20px'
            }
          }}
        >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <Typography variant="h2" color={colors.grey[100]}>
            Add new Class to A teacher 
          </Typography>
        </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: colors.primary[100],
            }}
            
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
          <TableUiAdd urlPlus={urlPlus} urlPlus2={urlPlus2} columnsSections={columnsSections}  idUser={contextId} />
          </DialogContent>
          <DialogActions>
          <Button autoFocus onClick={handleClose} variant="contained" size="large" color="primary">
            Confirm
          </Button>
          </DialogActions>
        </BootstrapDialog>
        </Box>
      </React.Fragment>
    );
  }


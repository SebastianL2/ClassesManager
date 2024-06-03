import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, IconButton } from '@mui/material';
import { DataGrid, GridAlignment, GridCellProps, GridEditCellValueParams, GridRenderCellParams, GridRenderColumnsProps, GridRowModesModel } from '@mui/x-data-grid';
import { useTheme } from '@mui/material';
import { palette } from '../../theme';
import { fetchData } from '../../API/estudents';
import { DeleteOutline } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import { deleteOne, saveOne } from '../../API/general-http-request';
import { SnackBarAlert } from './snack-bar-alert';
const TableUi: React.FC = () => {
  const theme = useTheme();
  const colors = palette(theme.palette.mode);
  const [dataStudents, setDataStudents] = useState([]);
  const [columnsStudents, setColumnsStudents] = useState<Column[]>([]);
  const [message, setMessage] = useState("");
  const [view, setView] = useState(false);

  interface apiPropsModifiers{
    id:string;
    name:string;
    last_name:string;
    email:string;
   }
  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      setDataStudents(data);
    };
    getData();
  }, []);

const deleteRow = (id:string)=>{
  console.log(`Deleting row with id: ${id}`);
  const request = async () => {
    const res =await deleteOne(id);
    if (res && res.message) {
      setMessage(res.message);
    } 
  }
  request()
}

const updateRow = (data:apiPropsModifiers)=>{
  setView(false);
  console.log(`Updating row with id: ${data.name} email: ${data.email} `);
  const request = async () => {
    const res =await saveOne(data);
    if (res && res.message) {
      setMessage(res.message);
      setView(true);
    } 
  }
  request()
}

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
    const columns: Column[] = [
      { field: "id", headerName: "ID", type: "number", align: 'left', headerAlign: 'left',editable: false  },
      { field: "name", headerName: "Name", align: 'left', headerAlign: 'left',editable: true },
      { field: "last_name", headerName: "LastName", type: "string", width: 100, align: 'left', headerAlign: 'left',editable: true  },
      { field: "email", headerName: "Email", type: "string", width: 200, align: 'left', headerAlign: 'left',editable: true  },
      { field: "options", headerName: "Options", type: "string", width: 150, align: 'left',editable: false , headerAlign: 'left',
        renderCell:({row})=>{
           const handleDelete=()=>{
             deleteRow(row.id)
           }
           const handleUpdate=()=>{
            
            
            updateRow(row);
          }
           return(
            <Box>
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteOutline />
            </IconButton>
            <IconButton aria-label="edit" color="secondary" onClick={handleUpdate}>
              <SaveIcon/>
            </IconButton>
            </Box>
           );
        }        
       },
    ];
    setColumnsStudents(columns);
  }, []);

  return (
    <Box
      m="0 0 0 0"
      width="auto"
      sx={{
        "& .MuiDataGrid-cell": { borderBottom: "none" },
        "& .name-column--cell": { color: colors.greenAccent[300] },
        "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
        "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
        "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.primary[700], },
        "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": { color: `${colors.grey[100]} !important` },
      }}
    >
      {view && <SnackBarAlert message={message} view={view} />}
      <Grid container>
        <Grid item xs={12}>
          
          <DataGrid
            rows={dataStudents}
            columns={columnsStudents}
            checkboxSelection
            disableRowSelectionOnClick
            autoHeight
            editMode="cell"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default TableUi;

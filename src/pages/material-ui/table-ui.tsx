import React, { useEffect, useState } from 'react';
import { AlertColor, Box, Button, Grid, IconButton } from '@mui/material';
import { DataGrid, GridAlignment, GridCellProps, GridEditCellValueParams, GridRenderCellParams, GridRenderColumnsProps, GridRowModesModel } from '@mui/x-data-grid';
import { useTheme } from '@mui/material';
import { palette } from '../../theme';
import { DeleteOutline } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import { deleteOne, fetchData, saveOne } from '../../API/general-http-request';
import { SnackBarAlert } from './snack-bar-alert';

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
const TableUi: React.FC<{urlPlus:string,columnsSections:Column[]}> = ({urlPlus,columnsSections}) => {

  const theme = useTheme();
  const colors = palette(theme.palette.mode);
  const [dataStudents, setDataStudents] = useState([]);
  const [columnsStudents, setColumnsStudents] = useState<Column[]>([]);
  const [message, setMessage] = useState("");
  const [view, setView] = useState(false);
  const [succes, setSucces] = useState<AlertColor>("success");

  interface apiPropsModifiers{
    id:string;
    name:string;
    last_name:string;
    email:string;
   }
  useEffect(() => {
    const getData = async () => {
      const data = await fetchData(urlPlus);
      setDataStudents(data);
    };
    getData();
  }, []);

const deleteRow = (id:string)=>{
  setDataStudents(dataStudents.filter((row: any) => row.id !== id));
  const request = async () => {
    const res =await deleteOne(id,urlPlus);
    if (res && res.message) {
      setMessage(res.message);
      
    } 
  }
  request()
}

const updateRow = (data:apiPropsModifiers)=>{
  setView(false);
  setSucces("success");

  const request = async () => {
    const res =await saveOne(data,urlPlus);
    if (res && res.message) {
      setMessage(res.message);
      setView(true);
 
    } 
    if (!res.succes) {
      setSucces("error");
    }
  }
  request()
}



  useEffect(() => {
    const columns: Column[] = [
      ...columnsSections,
      { field: "options", headerName: "Options", type: "string", width: 80, align: 'left',editable: false , headerAlign: 'left',
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
  sx={{
    
    maxHeight: 100, 
    minHeight: 50, 
    "& .MuiDataGrid-cell": { borderBottom: "none" },
    "& .name-column--cell": { color: colors.greenAccent[300] },
    "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
    "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
    "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.primary[700] },
    "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
    "& .MuiDataGrid-toolbarContainer .MuiButton-text": { color: `${colors.grey[100]} !important` },
  }}
>
  {view && <SnackBarAlert message={message} view={view} severity={succes} />}

      <DataGrid
        rows={dataStudents}
        columns={columnsStudents}
        checkboxSelection
        disableRowSelectionOnClick
        editMode="cell"
        sx={{
          "& .MuiDataGrid-virtualScroller": {
            maxHeight: 250, // Altura máxima del scroll interno del DataGrid
          },
        }}
      />

</Box>
  );
}

export default TableUi;

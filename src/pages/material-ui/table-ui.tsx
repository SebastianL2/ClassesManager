import React, { useEffect, useState } from 'react';
import { AlertColor, Box, CircularProgress, IconButton, Typography } from '@mui/material';
import { DataGrid, GridAlignment, GridRenderCellParams} from '@mui/x-data-grid';
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


const TableUi: React.FC<{urlPlus:string,urlPlus2?:string,columnsSections:Column[],updateParam:string}> = ({urlPlus,urlPlus2,columnsSections,updateParam}) => {

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
      let data;
      if(urlPlus2){
         data = await fetchData(urlPlus2);
      }else{
         data = await fetchData(urlPlus);
      }
      
      setDataStudents(data);
    };
    getData();
  }, [urlPlus2,view,updateParam]);





const deleteRow = (id:string)=>{
  
  setSucces("success");
  setDataStudents(dataStudents.filter((row: any) => row.id !== id));
  const request = async () => {
    const res =await deleteOne(id,urlPlus);
    if (res && res.message) {
      setMessage(res.message);
      setView(true);
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
  {dataStudents && dataStudents.length > 0 ? (
   
        <DataGrid
          rows={dataStudents}
          columns={columnsStudents}
          disableRowSelectionOnClick
          editMode="cell"
          sx={{
            "& .MuiDataGrid-virtualScroller": {
              maxHeight: 250, // Altura máxima del scroll interno del DataGrid
            },
          }}
        />
      ) : (
        <>

        <Box textAlign="center">
         
        <Typography variant="h2" gutterBottom>
          No data found
         
        </Typography>
        <CircularProgress
            size={80}  
            sx={{
              marginTop: '8vh',
              color: colors.greenAccent[500],
              top: -6,
              left: -5,
              zIndex: 1,
            }}
          />
       </Box>

        </>
      )}
</Box>
  );
}

export default TableUi;

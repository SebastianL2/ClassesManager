import React, { useEffect, useState } from 'react';
import { AlertColor, Box, Button } from '@mui/material';
import { DataGrid, GridAlignment, GridRenderCellParams} from '@mui/x-data-grid';
import { useTheme } from '@mui/material';
import { palette } from '../../theme';
import { AddAlarm} from '@mui/icons-material';
import { addOne, fetchData } from '../../API/general-http-request';
import { SnackBarAlert } from './snack-bar-alert';
import { useGlobalState } from '../general/global/GlobalStateContext';

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


const TableUiAdd: React.FC<{urlPlus:string,urlPlus2:string,columnsSections:Column[],idUser:string}> = ({urlPlus,urlPlus2,columnsSections,idUser}) => {

  const theme = useTheme();
  const colors = palette(theme.palette.mode);
  const [dataStudents, setDataStudents] = useState([]);
  const [columnsStudents, setColumnsStudents] = useState<Column[]>([]);
  const [message, setMessage] = useState("");
  const [view, setView] = useState(false);
  const [succes, setSucces] = useState<AlertColor>("success");
  const { data: contextId } = useGlobalState();

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
  }, [urlPlus,view]);

const addClassRow = (id:string)=>{
  setView(false);
  setSucces("success");
  const request = async () => {
    let res;
    if(urlPlus2=="assign-students"){
       res =await addOne(idUser,id,'classes',urlPlus2);
       
    }else{
      res =await addOne(id,idUser,'classes',urlPlus2);
    }
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
      { field: "options", headerName: "Options", type: "string", width: 150, align: 'left',editable: false , headerAlign: 'left',
        renderCell:({row})=>{
           const handleAddClass=()=>{
            addClassRow(row.id)
           }

           return(

            <Button
              onClick={handleAddClass}
              sx={{
                backgroundColor: colors.greenAccent[600],
                color: colors.grey[100],
                transition: "background-color 0.3s ease",
                '&:hover': {
                  backgroundColor: colors.greenAccent[500],
                }
              }}
            >
              <AddAlarm sx={{ mr: "10px" }} />
              Add Class
            </Button>
      
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
            maxHeight: 250, 
          },
        }}
      />

</Box>
  );
}

export default TableUiAdd;

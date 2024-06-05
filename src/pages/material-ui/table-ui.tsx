import React, { useEffect, useState } from 'react';
import { AlertColor, Box, IconButton, Typography } from '@mui/material';
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
          checkboxSelection
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
        <svg width="20vh" height="20vh" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M978.578286 900.461714l-108.617143-108.617143c30.134857-39.570286 48.274286-88.795429 48.274286-142.189714a235.739429 235.739429 0 0 0-235.52-235.373714 235.739429 235.739429 0 0 0-235.373715 235.373714 235.739429 235.739429 0 0 0 235.446857 235.52c53.467429 0 102.692571-18.139429 142.189715-48.274286l108.617143 108.544a31.524571 31.524571 0 0 0 44.836571 0 31.744 31.744 0 0 0 0.146286-44.982857zM510.902857 649.654857a172.105143 172.105143 0 0 1 171.885714-171.885714 171.885714 171.885714 0 0 1 0 343.771428 172.178286 172.178286 0 0 1-171.885714-171.885714z m270.262857-378.514286c0 17.554286-14.262857 31.744-31.817143 31.744H431.396571a31.744 31.744 0 0 1 0-63.488h317.952c17.554286 0 31.817143 14.189714 31.817143 31.744z m-609.426285 620.032h211.968a31.890286 31.890286 0 0 1 0 63.634286H171.739429c-58.368 0-106.057143-47.542857-106.057143-106.057143V283.062857c0-14.262857 5.12-28.086857 14.262857-39.058286L240.420571 53.101714a57.417143 57.417143 0 0 1 43.885715-20.48h517.997714c58.441143 0 106.057143 47.542857 106.057143 106.057143V366.445714a31.744 31.744 0 0 1-63.634286 0V138.605714a42.422857 42.422857 0 0 0-42.276571-42.349714H336.018286V280.137143a50.688 50.688 0 0 1-50.980572 50.176H129.389714v518.509714c0 23.332571 19.017143 42.349714 42.349715 42.349714zM272.457143 113.810286l-128.512 152.868571h128.512v-152.868571z m79.506286 476.16a31.744 31.744 0 0 0 0-63.634286H240.64a31.744 31.744 0 0 0 0 63.634286h111.323429z m0 146.066285a31.744 31.744 0 0 0 0-63.561142H240.64a31.744 31.744 0 0 0 0 63.561142h111.323429z m31.744-353.206857H240.64a31.744 31.744 0 0 0 0 63.561143h143.067429a31.744 31.744 0 0 0 0-63.561143z" fill={colors.grey[100]}></path></g></svg>
        </Box>

        </>
      )}
</Box>
  );
}

export default TableUi;

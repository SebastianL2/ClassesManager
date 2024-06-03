import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, IconButton } from '@mui/material';
import { DataGrid, GridAlignment, GridRenderCellParams, GridRenderColumnsProps } from '@mui/x-data-grid';
import { useTheme } from '@mui/material';
import { palette } from '../../theme';
import { fetchData } from '../../API/estudents';
import { DeleteOutline } from '@mui/icons-material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { deleteOne } from '../../API/general-http-request';
const TableUi: React.FC = () => {
  const theme = useTheme();
  const colors = palette(theme.palette.mode);
  const [dataStudents, setDataStudents] = useState([]);
  const [columnsStudents, setColumnsStudents] = useState<Column[]>([]);

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
  }

  useEffect(() => {
    const columns: Column[] = [
      { field: "id", headerName: "ID", type: "number", align: 'left', headerAlign: 'left' },
      { field: "name", headerName: "Name", align: 'left', headerAlign: 'left' },
      { field: "last_name", headerName: "LastName", type: "string", width: 100, align: 'left', headerAlign: 'left' },
      { field: "email", headerName: "Email", type: "string", width: 200, align: 'left', headerAlign: 'left' },
      { field: "options", headerName: "Options", type: "string", width: 200, align: 'left', headerAlign: 'left',
        renderCell:({row})=>{
           const handleDelete=()=>{
             deleteRow(row.id)
           }
           return(
            <Box>
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteOutline />
            </IconButton>
            <IconButton aria-label="delete" color="secondary">
              <EditOutlinedIcon/>
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
      <Grid container>
        <Grid item xs={12}>
          <DataGrid
            rows={dataStudents}
            columns={columnsStudents}
            checkboxSelection
            disableRowSelectionOnClick
            autoHeight
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default TableUi;

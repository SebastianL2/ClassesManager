import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { DataGrid, GridAlignment } from '@mui/x-data-grid';
import { useTheme } from '@mui/material';
import { palette } from '../../theme';
import { fetchData } from '../../API/estudents';

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

interface Column {
    field: string;
    headerName: string;
    type?: 'number' | 'string';
    flex?: number;
    width?: number;
    align?:GridAlignment;
    headerAlign?:GridAlignment
  }

  useEffect(() => {
    const columns: Column[] = [
      { field: "id", headerName: "ID", type: "number", align: 'left', headerAlign: 'left' },
      { field: "name", headerName: "Name", align: 'left', headerAlign: 'left' },
      { field: "last_name", headerName: "LastName", type: "string", width: 100, align: 'left', headerAlign: 'left' },
      { field: "email", headerName: "Email", type: "string", width: 200, align: 'left', headerAlign: 'left' },
      { field: "options", headerName: "Options", type: "string", width: 200, align: 'left', headerAlign: 'left' },
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

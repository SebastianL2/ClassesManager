import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridSlots,
} from '@mui/x-data-grid';
import { fetchData } from '../../API/estudents';
import { v4 as uuidv4 } from 'uuid';
import { Grid, useTheme } from '@mui/material';
import { palette } from '../../theme';






interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = uuidv4();
    setRows((oldRows) => [...oldRows, { id, name: '', last_name: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function TableEditUi() {
    const theme = useTheme();
    const colors = palette(theme.palette.mode);
    const [dataStudents, setDataStudents] = useState([]);
    const [rows, setRows] = React.useState<GridRowsProp>([]);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    useEffect(() => {
      const getData = async () => {
        const data = await fetchData();
        setDataStudents(data);
        setRows(data);
      };
      getData();
    }, [dataStudents]);



  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    
  };

  const handleSaveClick = (id: GridRowId) => () => {

      setRowModesModel({  [id]: { mode: GridRowModes.View } });

  };


  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };



  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 180, editable: true },
    { field: 'name', headerName: 'Name', width: 80, editable: true },
    {
      field: 'last_name',
      headerName: 'LasName',
      type: 'string',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Join date',
      type: 'string',
      width: 180,
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
     
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        const handleSaveAndUpdate = async (id: GridRowId, event: React.MouseEvent<HTMLButtonElement | HTMLLIElement>) => {
            event.preventDefault();
            await handleSaveClick(id);
          
          };
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={(event) => handleSaveAndUpdate(id, event)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

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
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={{
            toolbar: EditToolbar as GridSlots['toolbar'],
            }}
            slotProps={{
            toolbar: { setRows, setRowModesModel },
            }}
        />
        </Grid>
      </Grid>
    </Box>
  );
}

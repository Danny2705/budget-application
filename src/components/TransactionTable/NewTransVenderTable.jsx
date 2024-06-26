import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowModes,
} from "@mui/x-data-grid";
import { useState } from "react";
import { styled } from "@mui/system";

const CustomDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-columnsContainer": {
    background: "linear-gradient(to right, #8e24aa, #e91e63, #f44336)",
    color: "#fff",
  },
  "& .MuiDataGrid-columnHeader": {
    borderBottom: "none",
    fontSize: "1rem",
    fontWeight: 600,
    letterSpacing: "0.5px",
    padding: "16px",
  },
  "& .MuiDataGrid-row": {
    fontSize: "0.875rem",
    fontWeight: 400,
  },
  "& .MuiDataGrid-cell": {
    borderBottom: "1px solid #e0e0e0",
    padding: "16px",
  },
}));

function EditToolbar({ setRows, setRowModesModel }) {
  const handleClick = () => {
    const id = new Date().getTime();
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        vendor: "",
        date: "",
        address: "",
        category: "",
        subtotal: "",
        tax: "",
        tip: "",
        total: "",
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "vendor" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color='primary' startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

const NewTransVenderTable = ({ receiptInfo }) => {
  const [rows, setRows] = useState(
    receiptInfo.map((info, index) => ({
      id: index,
      ...info,
    }))
  );
  const [rowModesModel, setRowModesModel] = useState({});

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "vendor", headerName: "Vendor", width: 180, editable: true },
    { field: "date", headerName: "Date", width: 150, editable: true },
    { field: "address", headerName: "Location", width: 200, editable: true },
    { field: "category", headerName: "Category", width: 150, editable: true },
    {
      field: "subtotal",
      headerName: "Subtotal (CAD$)",
      width: 180,
      editable: true,
    },
    { field: "tax", headerName: "Tax (CAD$)", width: 150, editable: true },
    { field: "tip", headerName: "Tip (CAD$)", width: 150, editable: true },
    { field: "total", headerName: "Total (CAD$)", width: 150, editable: true },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label='Save'
              sx={{ color: "primary.main" }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label='Cancel'
              onClick={handleCancelClick(id)}
              color='inherit'
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label='Edit'
            onClick={handleEditClick(id)}
            color='inherit'
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label='Delete'
            onClick={handleDeleteClick(id)}
            color='inherit'
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <CustomDataGrid
        rows={rows}
        columns={columns}
        editMode='row'
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        processRowUpdate={processRowUpdate}
        components={{
          Toolbar: EditToolbar,
        }}
        componentsProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
};

export default NewTransVenderTable;

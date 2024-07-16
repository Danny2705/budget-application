import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";

export default function NewTransVenderTable({ receiptInfo }) {
  const [rows, setRows] = useState([]);
  console.log(receiptInfo);

  useEffect(() => {
    if (receiptInfo) {
      setRows([
        {
          id: randomId(),
          vendor: receiptInfo.vendor.name,
          date: receiptInfo.date,
          location: receiptInfo.vendor.address,
          category: receiptInfo.category,
          subtotal: receiptInfo.subtotal || 0,
          tax: receiptInfo.tax || 0,
          tip: receiptInfo.tip || 0,
          total: receiptInfo.total,
        },
      ]);
    }
  }, [receiptInfo]);

  const [rowModesModel, setRowModesModel] = useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
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
    { field: "date", headerName: "Date", width: 120, editable: true },
    { field: "location", headerName: "Location", width: 180, editable: true },
    { field: "category", headerName: "Category", width: 150, editable: true },
    {
      field: "subtotal",
      headerName: "Subtotal",
      width: 100,
      type: "number",
      editable: true,
    },
    {
      field: "tax",
      headerName: "Tax",
      width: 100,
      type: "number",
      editable: true,
    },
    {
      field: "tip",
      headerName: "Tip",
      width: 100,
      type: "number",
      editable: true,
    },
    {
      field: "total",
      headerName: "Total",
      width: 100,
      type: "number",
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  style={{ color: "#9E5EED" }}
                />
              }
              label='Save'
              sx={{ color: "primary.main" }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={
                <FontAwesomeIcon
                  icon={faTrashCan}
                  style={{ color: "#DD5250" }}
                />
              }
              label='Cancel'
              className='textPrimary'
              onClick={handleCancelClick(id)}
              color='inherit'
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={
              <FontAwesomeIcon
                icon={faPenToSquare}
                style={{ color: "#9E5EED" }}
              />
            }
            label='Edit'
            className='textPrimary'
            onClick={handleEditClick(id)}
            color='inherit'
          />,
          <GridActionsCellItem
            icon={
              <FontAwesomeIcon icon={faTrashCan} style={{ color: "#DD5250" }} />
            }
            label='Delete'
            onClick={handleDeleteClick(id)}
            color='inherit'
          />,
        ];
      },
    },
  ];

  return (
    <div>
      <h1 className='text-main-darkPink font-bold text-2xl md:text-4xl lg:text-4xl mt-8 mb-8 tracking-wider text-center lg:text-left'>
        Vendor information
      </h1>

      <Box
        sx={{
          height: 500,
          width: "100%",
          "& .MuiDataGrid-columnHeaders": {
            background:
              "linear-gradient(to right, #7F00FF, #E100FF, #FF0080) !important",
            color: "black",
          },
          "& .MuiDataGrid-row:nth-of-type(odd)": {
            backgroundColor: "#424242",
          },
          "& .MuiDataGrid-row:nth-of-type(even)": {
            backgroundColor: "#303030",
          },
          "& .MuiDataGrid-cell": {
            color: "white",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          editMode='row'
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
        />
      </Box>
    </div>
  );
}

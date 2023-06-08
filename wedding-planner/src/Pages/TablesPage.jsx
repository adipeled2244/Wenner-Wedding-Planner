import classes from "./TablesPage.module.css";
import UserContext from "../Store/user-context";
import { useContext, useEffect, useState } from "react";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import GetAppIcon from "@mui/icons-material/GetApp";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import GroupsIcon from "@mui/icons-material/Groups";
import { Tooltip } from "@mantine/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Draggable from "react-draggable";

import Head from "../Components/Global/Head/Head";
import Table from "../Components/UI/Table";

import AddTableForm from "../Components/Tables/AddTableForm/AddTableForm";
import data from "../Assets/Constants/Tables";
import { CSVLink } from "react-csv";
import { ToCsv } from "../Utils/utils";
import TableTooltipCard from "../Components/Tables/TableTooltipCard/TableTooltipCard";
const { toastConfig } = require("../Utils/constants");

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 606,
  bgcolor: "background.paper",
  boxShadow: 15,
  p: 4,
};

const TablesPage = (props) => {
  const { user, updateTables } = useContext(UserContext);
  const tables = user.tables;
  const guests = user.guests;
  const headerName = "Tables";

  const onDownload = () => {
    console.log("download");
  };

  // modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const prepareTables = () => {
    const tablesDB = tables;
    tablesDB.forEach((table) => {
      const jsonTable = data.tables.find((tJ) => tJ.id === table.tableTypeId);
      if (jsonTable) {
        table.shape = jsonTable.shape;
        table.size = jsonTable.size;
        table.tableMaxPeople = jsonTable.tableMaxPeople;
      }
    });
    return tablesDB;
  };
  const [tablesState, setTablesState] = useState(prepareTables());

  const createDataCsvGuestTables = () => {
    const sortedGuests = guests.sort((a, b) => a.table - b.table);
    let data = [];
    sortedGuests.forEach((guest) => {
      const tableNumber = guest.table ? guest.table : "Not assigned";
      const row = {
        table: tableNumber,
        name: guest.name,
        attending: guest.attending,
      };
      data.push(row);
    });
    return data;
  };

  let dataToCsv = ToCsv(createDataCsvGuestTables());

  const buttonsHeader = [
    <CSVLink data={dataToCsv} filename={"tables.csv"}>
      <Button
        variant="contained"
        key="download"
        onClick={onDownload}
        startIcon={<GetAppIcon />}
        size="small"
        style={{
          borderRadius: 35,
          color: "black",
          backgroundColor: "white",
          padding: "3px 14px",
          boxShadow: "none",
          border: "1px solid #E7E7EB",
        }}
      >
        Download CSV{" "}
      </Button>
    </CSVLink>,
    <Button
      style={{
        borderRadius: 35,
        color: "white",
        backgroundColor: "#5F41D9",
        padding: "3px 14px",
        boxShadow: "none",
      }}
      variant="contained"
      key="add"
      onClick={handleOpen}
      startIcon={<AddIcon />}
      size="small"
    >
      Add table{" "}
    </Button>,
  ];

  useEffect(() => {
    setTablesState(prepareTables());
  }, [tables]);

  const handleDragTable = (e, data) => {
    const tableIndex = tablesState.findIndex(
      (table) => table._id === data.node.id
    );
    const table = tablesState[tableIndex];
    table.x = data.lastX;
    table.y = data.lastY;
    const newTables = [...tablesState];
    newTables[tableIndex] = table;
    setTablesState(newTables);
  };

  const DraggableTable = ({
    shape,
    size,
    id,
    tableNumber,
    x,
    y,
    selectedMaxSeats,
    tableMaxPeople,
  }) => {
    const tableGuests = guests.filter((guest) => guest.table === tableNumber);

    return (
      <div
      style  = {{
        position: "absolute",
        top: "0",
        left: "0",
        width: "0",
        height: "0",
      }}
      >
        <Draggable onStop={handleDragTable} defaultPosition={{ x: x, y: y }}>
          <div
            style={{
              display: "inline-block",
              margin: "15px",
              cursor: "pointer",
            }}
            id={id}
          >
            <Tooltip
              label={
                <TableTooltipCard
                  tableNumber={tableNumber}
                  guests={tableGuests}
                />
              }
              withArrow
              color="white"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <span>Table: {tableNumber}</span> |
                <span
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <GroupsIcon /> {tableGuests.length || 0}/{selectedMaxSeats}
                </span>
              </div>
            </Tooltip>
            <Table key={id} shape={shape} size={size} place={"event"}></Table>
          </div>
        </Draggable>{" "}
      </div>
    );
  };

  const allTables = tablesState.map((table, i) => {
    return (
      <DraggableTable
        key={i}
        id={table._id}
        shape={table.shape}
        size={table.size}
        tableNumber={table.tableNumber}
        selectedMaxSeats={table.selectedMaxSeats}
        x={table.x}
        y={table.y}
        tableMaxPeople={table.tableMaxPeople}
      ></DraggableTable>
    );
  });

  const handleSavePositions = async () => {
    try {
      await updateTables(tablesState);
      toast.success("Tables updated successfully!", toastConfig);
    } catch (err) {
      toast.error("Tables updated failed!", toastConfig);
    }
  };

  return (
    <>
      <Head buttonsHeader={buttonsHeader} headerName={headerName} />
      <div className={classes.tablePage}>
        <Button
          variant="contained"
          key="download"
          onClick={handleSavePositions}
          size="small"
          style={{
            borderRadius: 35,
            color: "black",
            backgroundColor: "white",
            padding: "3px 14px",
            boxShadow: "none",
            border: "2px solid #E7E7EB",
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        >
          Save positions{" "}
        </Button>
        <div className={classes.tablesContainer}>{allTables}</div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddTableForm onClose={handleClose} />
        </Box>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <ToastContainer />
    </>
  );
};

export default TablesPage;

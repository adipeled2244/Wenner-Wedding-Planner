import classes from "./TablesPage.module.css";
import UserContext from "../Store/user-context";
import { useContext, useEffect, useState } from "react";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import GetAppIcon from "@mui/icons-material/GetApp";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Head from "../Components/Global/Head/Head";

import AddTableForm from "../Components/Tables/AddTableForm/AddTableForm";
import data from "../Assets/Constants/Tables";
import { CSVLink } from "react-csv";
import { ToCsv } from "../Utils/utils";
const { toastConfig } = require("../Utils/constants");
import DraggableTable from "../Components/Tables/DraggableTable/DraggableTable";

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
  const headerName = "Tables";
  const { user, updateTables } = useContext(UserContext);
  const tables = user.tables;
  const guests = user.guests;

  const onDownload = () => {
    console.log("download");
  };

  // modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const prepareTables = () => {
    const tablesDB = tables;
    tablesDB&& tablesDB.forEach((table) => {
      const jsonTable = data.tables.find((tJ) => tJ.id === table.tableTypeId);
      if (jsonTable) {
        table.shape = jsonTable.shape;
        table.size = jsonTable.size;
        table.tableMaxPeople = jsonTable.tableMaxPeople;
      }
    });
    return tablesDB;
  };
  const [preparedTables, setPreparedTables] = useState(prepareTables());

  const createDataCsvGuestsTables = () => {
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

  let dataToCsv = ToCsv(createDataCsvGuestsTables());

  const handleSavePositions = async () => {
    try {
      await updateTables(preparedTables);
      toast.success("Tables updated successfully!", toastConfig);
    } catch (err) {
      toast.error("Tables updated failed!", toastConfig);
    }
  };
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
   
      }}
    >
      Save positions{" "}
    </Button>
  ];

  useEffect(() => {
    setPreparedTables(prepareTables());
  }, [tables]);

  const handleDragTable = (e, data) => {
    const tableIndex = preparedTables.findIndex(
      (table) => table._id === data.node.id
    );
    const table = preparedTables[tableIndex];
    table.x = data.lastX;
    table.y = data.lastY;
    const newTables = [...preparedTables];
    newTables[tableIndex] = table;
    setPreparedTables(newTables);
  };

  const allTables = preparedTables.map((table, i) => {
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
        guests={guests}
        handleDragTable={handleDragTable}
      ></DraggableTable>
    );
  });



  const vh = window.innerHeight - 70 - 60 - 1; // minus header and head

  return (
    <>
      <Head buttonsHeader={buttonsHeader} headerName={headerName} />
      <div className={classes.tablePage} style={{ height: vh }}>
              {allTables}
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

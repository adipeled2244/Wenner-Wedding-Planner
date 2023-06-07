import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import GetAppIcon from "@mui/icons-material/GetApp";
import Head from "../Components/Head/Head";
import Table from "../Components/UI/Table";
import classes from "./TablesPage.module.css";
import UserContext from "../Store/user-context";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Draggable from "react-draggable";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AddTableForm from "../Components/Tables/AddTableForm/AddTableForm";
import data from "../Assets/Constants/Tables";
import { CSVLink, CSVDownload } from "react-csv";
import { ToCsv } from "../Utils/utils";
import { Tooltip } from "@mantine/core";
import TableTooltipCard from "../Components/Tables/TableTooltipCard/TableTooltipCard";
import GroupsIcon from '@mui/icons-material/Groups';
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
  const {
    user: { tables, guests },
    updateTables,
  } = useContext(UserContext);
  console.log("render");
  const onDownload = () => {
    console.log("download");
  };

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const tablePrepare = () => {
    const tablesDB = tables;

    tablesDB.forEach((table) => {
      const jsonTable = data.tables.find((tJ) => tJ.id === table.tableTypeId);
      if (jsonTable) {
        table.shape = jsonTable.shape;
        table.size = jsonTable.size;
      }
    });
    return tablesDB;
  };

  // const ToCsv = (data) => {
  //   let dataToCsv = [];
  //   let headArr = Object.keys(data[0]);
  //   dataToCsv.push(headArr);
  //   data.forEach((row) => {
  //     const arr = Object.values(row).map(String);
  //     dataToCsv.push(arr);
  //   });
  //   return dataToCsv;
  // };
  const headerName = "Tables";
  //   const headerName = <Tooltip
  //   label={<AddTableForm onClose={handleClose}/>}
  //   color="blue"
  //   withArrow
  // ><div> Tables </div></Tooltip>
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
          // overflowX:  "inherit",
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

  const [tablesState, setTablesState] = useState(tablePrepare());
  useEffect(() => {
    setTablesState(tablePrepare());
  }, [tables]);

  const eventHandler = (e, data) => {
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

  const DraggableCard = ({ shape, size, id, tableNumber, x, y ,selectedMaxSeats
  }) => {
    // console.log(x,y)
    const tableGuests= guests.filter((guest=>guest.table === tableNumber ))
    console.log(tableGuests.length)
    console.log(tableNumber,selectedMaxSeats)
    return (
      <div>
        <Draggable onStop={eventHandler} defaultPosition={{ x: x, y: y }}>
          <div style={{ display: "inline-block", margin: "15px", cursor:'pointer' }} id={id}>
            <Tooltip
              label={
                <TableTooltipCard tableNumber={tableNumber} guests={tableGuests} />
              }
              withArrow
              color="white"
            >
              <div style={{ display: "flex", justifyContent: "center",gap:"10px" }}>
                <span>Table: {tableNumber}</span> |
                <span style={{ display: "flex", justifyContent: "center" ,gap:"10px"}}><GroupsIcon/> {tableGuests.length}/{selectedMaxSeats}</span> 
              </div>
            </Tooltip>
            <Table key={id} shape={shape} size={size} place={"event"}></Table>
          </div>
        </Draggable>{" "}
      </div>
    );
  };
  const allTables = tablesState.map((table, i) => {
    console.log(table)
    return (
      <DraggableCard
        key={i}
        id={table._id}
        shape={table.shape}
        size={table.size}
        tableNumber={table.tableNumber}
        selectedMaxSeats={table.selectedMaxSeats}
        x={table.x}
        y={table.y}
      ></DraggableCard>
    );
  });
  // console.log(allTables)

  const saveHandler = async () => {
    try {
      await updateTables(tablesState);
      toast.success("Tables updated successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      toast.error("Tables updated failed!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <Head buttonsHeader={buttonsHeader} headerName={headerName} />
      <div className={classes.tablePage}>
        <Button
          variant="contained"
          key="download"
          onClick={saveHandler}
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
            // overflowX:  "inherit",
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
        hideProgressBar={false}
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

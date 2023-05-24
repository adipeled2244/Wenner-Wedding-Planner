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
import  Draggable  from "react-draggable";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AddTableForm from "../Components/AddTableForm/AddTableForm";
import data from '../Assets/Constants/Tables'

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
    user: { tables },
    updateTables,
  } = useContext(UserContext);
  console.log("render")
  const onDownload = () => {
    console.log("download");
  };

  //modal
  const [open, setOpen] =  useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const headerName = "Tables";
  const buttonsHeader = [
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
    </Button>,
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

  const tablePrepare=()=>{
    const tablesDB=tables;
    
    tablesDB.forEach((table) => {
      const jsonTable = data.tables.find((tJ) => tJ.id === table.tableTypeId);
      if (jsonTable) {
        table.shape = jsonTable.shape;
        table.size = jsonTable.size;
      }
    });
    return tablesDB

  }

  const [tablesState, setTablesState] = useState(tablePrepare());
  useEffect(() => {
    setTablesState(tablePrepare());
  }, [tables]);

  const eventHandler = (e, data) => {
    const tableIndex = tablesState.findIndex((table) => table._id === data.node.id);
    const table = tablesState[tableIndex];
    table.x = data.lastX;
    table.y = data.lastY;
    const newTables = [...tablesState];
    newTables[tableIndex] = table;
    setTablesState(newTables);
  }

  const DraggableCard = ({shape,size,id,tableNumber,x,y}) => {
    // console.log(x,y)
    return (
      <Draggable  onStop={eventHandler} defaultPosition={{x: x, y:y}} >
        <div style={{display:'inline-block', margin:'15px'}} id={id} >
        <div style={{display:'flex',justifyContent:"center"}}><span>Table: {tableNumber}</span></div>
        <Table
          key={id}
          shape={shape}
          size={size}
          place={"event"}
        ></Table></div>
      </Draggable>
    );
  };
  const allTables = tablesState.map((table,i) => {
    // console.log(table)
    return (
      <DraggableCard
        key={i}
        id={table._id}
        shape={table.shape}
        size={table.size}
        tableNumber={table.tableNumber}
        x={table.x}
        y={table.y}
      ></DraggableCard>
    )
    
    ;
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
        <AddTableForm onClose={handleClose}/>
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

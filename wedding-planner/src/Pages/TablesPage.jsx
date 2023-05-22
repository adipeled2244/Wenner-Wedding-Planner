import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import GetAppIcon from "@mui/icons-material/GetApp";
import Head from "../Components/Head/Head";
import Table from "../Components/UI/Table";
import classes from "./TablesPage.module.css";
import UserContext from "../Store/user-context";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  Draggable  from "react-draggable";


const TablesPage = (props) => {
  const {
    user: { tables },
    updateTables,
  } = useContext(UserContext);
  const onDownload = () => {
    console.log("download");
  };
  const onAddTable = () => {
    console.log("add table");
  };

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
      onClick={onAddTable}
      startIcon={<AddIcon />}
      size="small"
    >
      Add table{" "}
    </Button>,
  ];

  const [tablesState, setTablesState] = useState(tables);
  const eventHandler = (e, data) => {
    console.log('Event Type', e.type);
    console.log({e, data});
    console.log(data.node.id)
    console.log(data.lastX)
    console.log(data.lastY)

    const tableIndex = tablesState.findIndex((table) => table._id === data.node.id);
    const table = tablesState[tableIndex];
    table.x = data.lastX;
    table.y = data.lastY;
    const newTables = [...tablesState];
    newTables[tableIndex] = table;
    setTablesState(newTables);
    console.log(newTables)
  }

  const DraggableCard = ({shape,size,id,tableNumber,x,y}) => {
    console.log(x,y)
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
    console.log(table)
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
  console.log(allTables)


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
          Save changes{" "}
        </Button>
        <div className={classes.tablesContainer}>{allTables}</div>

      </div>
     
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

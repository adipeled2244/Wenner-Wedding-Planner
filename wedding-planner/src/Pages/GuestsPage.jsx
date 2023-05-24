import React, { useContext, useEffect } from "react";

import Head from "../Components/Head/Head";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import GetAppIcon from "@mui/icons-material/GetApp";
// import classes from "./GuestsPage.module.css";
import EnhancedTable from "../Components/TableLayout/TableLayout";
import { CSVLink, CSVDownload } from "react-csv";
import UserContext from "../Store/user-context";
import Filters from "../Components/Filters/Filters";  

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 520,
  bgcolor: "background.paper",
  boxShadow: 15,
  p: 4,
};
import AddGuestForm from "../Components/AddGuestForm/AddGuestForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToCsv = (data) => {
  let dataToCsv = [];
  let headArr = Object.keys(data[0]);
  dataToCsv.push(headArr);
  data.forEach((row) => {
    const arr = Object.values(row).map(String);
    dataToCsv.push(arr);
  });
  return dataToCsv;
};

const GuestPage = (props) => {
  const {
    user: { guests },
  } = useContext(UserContext);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  let dataToCsv = ToCsv(guests);
  const headerName = "Guests";
  const buttonsHeader = [
    <CSVLink data={dataToCsv} filename={"guests.csv"}>
      <Button
        variant="contained"
        size="small"
        style={{
          borderRadius: 35,
          color: "black",
          backgroundColor: "white",
          padding: "3px 14px",
          boxShadow: "none",
          border: "1px solid #E7E7EB",
        }}
        key="download"
        startIcon={<GetAppIcon />}
      >
        Download CSV
      </Button>
    </CSVLink>,
    <Button
      size="small"
      variant="contained"
      key="add"
      onClick={handleOpen}
      startIcon={<AddIcon />}
      style={{
        borderRadius: 35,
        color: "white",
        backgroundColor: "#5F41D9",
        padding: "3px 14px",
        boxShadow: "none",
      }}
    >
      Add Guest{" "}
    </Button>,
  ];
  const [rowsAfterFilter, setRowsAfterFilter] = React.useState(guests);

  useEffect(() => {
    setRowsAfterFilter(guests)
  }, [guests])

    //call from filter component
    const filterChange= (filtersMap)=>{
      let filteredRows=[]
     

      filteredRows= guests.filter(row=>{
      
        if(((row.attending == filtersMap.get('attending')) || filtersMap.get('attending')== "all")&&
          ((row.group == filtersMap.get('group')) || filtersMap.get('group')== "all") &&
          ((row.side == filtersMap.get('side')) || filtersMap.get('side')== "all") &&
          ( !filtersMap.get('search') || row.name.toLowerCase().includes(filtersMap.get('search').toLowerCase()))
        ){
          return true
        }
        return false;
  
    })
    setRowsAfterFilter(filteredRows)
    }


  return (
    <>
      <Head buttonsHeader={buttonsHeader} headerName={headerName} />
      <Filters onFilterChange={filterChange}  />
      <EnhancedTable rowsAfterFilter={rowsAfterFilter } />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddGuestForm onClose={handleClose} />
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
      {/* Same as */}
      <ToastContainer />
    </>
  );
};

export default GuestPage;

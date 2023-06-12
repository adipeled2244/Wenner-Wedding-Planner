import React, { useContext, useEffect,useState} from "react";

import Head from "../Components/Global/Head/Head";
import GuestsTable from "../Components/Guests/GuestsTable/GuestsTable";
import { CSVLink } from "react-csv";
import UserContext from "../Store/user-context";
import Filters from "../Components/Guests/Filters/Filters";  
import {ToCsv} from '../Utils/utils'
import AddGuestForm from "../Components/Guests/AddGuestForm/AddGuestForm";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import GetAppIcon from "@mui/icons-material/GetApp";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {GuestsButtonsMenu} from '../Components/Guests/GuestsButtonsMenu/GuestsButtonsMenu'

const formAddGuestStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 520,
  bgcolor: "background.paper",
  boxShadow: 15,
  p: 4,
};


const GuestPage = (props) => {
  const {user} = useContext(UserContext);
  const {guests} = user;
  const [open, setOpen] = useState(false);
  const [rowsAfterFilter, setRowsAfterFilter] = useState(guests);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let dataToCsv = ToCsv(guests.map((guest)=>{
    return {
      name:guest.name,
      email:guest.email,
      phone:guest.phone,
      side:guest.side,
      invitation:guest.invitation ? "Sent" : "not send yet",
      status:guest.status==='notAttending' ? "Not Attending" : guest.status==='attending' ? 'Attending' : 'Not Replied' ,
      attending:guest.attending,
      group:guest.group,
      table:guest.table ==0 ? '' : guest.table
      
    }
  }));
  
  const headerName = "Guests";

  useEffect(() => {
    setRowsAfterFilter(guests)
  }, [guests])

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
      <Head buttonsHeader={ <GuestsButtonsMenu  handleOpen={handleOpen} dataToCsv={dataToCsv}    />} headerName={headerName} />
      <Filters onFilterChange={filterChange}  />
      <GuestsTable rowsAfterFilter={rowsAfterFilter } />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={formAddGuestStyle}>
          <AddGuestForm onClose={handleClose} />
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

export default GuestPage;

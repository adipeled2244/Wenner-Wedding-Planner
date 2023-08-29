import React, { useContext, useEffect, useState } from "react";

import Head from "../Components/Global/Head/Head";
import GuestsTable from "../Components/Guests/GuestsTable/GuestsTable";
import UserContext from "../Store/user-context";
import Filters from "../Components/Guests/Filters/Filters";
import { ToCsv } from "../Utils/utils";
import AddGuestForm from "../Components/Guests/AddGuestForm/AddGuestForm";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GuestsButtonsMenu } from "../Components/Guests/GuestsButtonsMenu/GuestsButtonsMenu";
import { toastContainerConfig } from "../Utils/Constants/toastConfig";

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
  const { user } = useContext(UserContext);
  // const { guests } = user;
  const [guests, setGuests] = useState([]);
  const [open, setOpen] = useState(false);
  const [rowsAfterFilter, setRowsAfterFilter] = useState(guests);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
     setRowsAfterFilter(guests);
  }, [guests]);

  useEffect(() => {
     const { guests } = user;
     setGuests(guests);
    setRowsAfterFilter(guests);
  }, [user]);

  let dataToCsv =
    guests.length > 0
      ? ToCsv(
          guests.map((guest) => {
            return {
              name: guest.name,
              email: guest.email,
              phone: guest.phone,
              side: guest.side==="brideAndGroom" ? "bride and groom" : guest.side,
              invitation: guest.invitation ? "Sent" : "not send yet",
              status:
                guest.status === "notAttending"
                  ? "Not Attending"
                  : guest.status === "attending"
                  ? "Attending"
                  : "Not Replied",
              attending: guest.attending === null ? "" : guest.attending,
              group: guest.group,
              table: guest.table == undefined ? "Not assign yet" : guest.table,
            };
          })
        )
      : [];

  const filterChange = (filtersMap) => {
    let filteredRows = [];
     if (guests.length === 0) return filteredRows;
    filteredRows = guests.filter((row) => {
      if (
        (row.attending == filtersMap.get("attending") ||
          filtersMap.get("attending") == "all") &&
        (row.group == filtersMap.get("group") ||
          filtersMap.get("group") == "all") &&
        (row.side == filtersMap.get("side") ||
          filtersMap.get("side") == "all") &&
        (!filtersMap.get("search") ||
          row.name
            .toLowerCase()
            .includes(filtersMap.get("search").toLowerCase()))
      ) {
        return true;
      }
      return false;
    });
    setRowsAfterFilter(filteredRows);
  };

  return (
    <>
      <Head
        buttonsHeader={
          <GuestsButtonsMenu handleOpen={handleOpen} dataToCsv={dataToCsv} />
        }
        headerName={"Guests"}
      />
      <Filters onFilterChange={filterChange} />
      {guests.length > 0 && <GuestsTable rowsAfterFilter={rowsAfterFilter} />}
      {guests.length === 0 && (
        <div style={{ marginLeft: "30px" }}>No guests yet</div>
      )}
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
      <ToastContainer {...toastContainerConfig} />
      <ToastContainer />
    </>
  );
};

export default GuestPage;

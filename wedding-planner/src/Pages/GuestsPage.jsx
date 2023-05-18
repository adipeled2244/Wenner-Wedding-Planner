import React from "react";
import Head from "../Components/Head/Head";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import GetAppIcon from '@mui/icons-material/GetApp';
// import classes from "./GuestsPage.module.css";
import EnhancedTable from "../Components/TableLayout/TableLayout";
const GuestPage = (props) => {

    const onDownload = () => {
        console.log("download");
      };
      const onAddGuest = () => {
        console.log("add");
      };
7
      const headerName = "Guests";
      const buttonsHeader = [
        <Button   variant="contained" size="small" style={{
          borderRadius: 35,
          color: 'black',
          backgroundColor: "white",
          padding: "3px 14px",
          boxShadow: "none",
          border: "1px solid #E7E7EB",
      }}
        key="download" onClick={onDownload}  startIcon={<GetAppIcon/>} >Download CSV </Button>,
        <Button size="small" variant="contained"  key="add" onClick={onAddGuest}  startIcon={<AddIcon/>}  style={{
          borderRadius: 35,
          color: 'white',
          backgroundColor: "#5F41D9",
          padding: "3px 14px",
          boxShadow: "none",
      }} >Add Guest </Button>,
      ];


  return (
    <>
    <Head buttonsHeader={buttonsHeader} headerName={headerName}  />
    <EnhancedTable/>
    </>
  );
};

export default GuestPage;

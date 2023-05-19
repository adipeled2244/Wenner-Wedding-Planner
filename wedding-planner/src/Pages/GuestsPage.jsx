import React,{useContext} from "react";
import Head from "../Components/Head/Head";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import GetAppIcon from '@mui/icons-material/GetApp';
// import classes from "./GuestsPage.module.css";
import EnhancedTable from "../Components/TableLayout/TableLayout";
import { CSVLink, CSVDownload } from "react-csv";
import UserContext from '../Store/user-context';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ToCsv=(data)=>{
  let dataToCsv=[];
  let headArr=Object.keys(data[0]);
  dataToCsv.push(headArr);
  console.log(dataToCsv);
  data.forEach((row)=>{
    const arr = Object.values(row).map(String);
    dataToCsv.push(arr);
  }
  )
  return dataToCsv;
}

const GuestPage = (props) => {

  const usrCtx= useContext(UserContext);
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const csvData = [
  //   ["firstname", "lastname", "email"],
  //   ["Ahmed", "Tomi", "ah@smthing.co.com"],
  //   ["Raed", "Labes", "rl@smthing.co.com"],
  //   ["Yezzi", "Min l3b", "ymin@cocococo.com"]
  // ];

// to use effect guest change
  let dataToCsv=ToCsv(usrCtx.guests)

    const onDownload = () => {
        console.log("download");
      };
      const onAddGuest = () => {
        console.log("add");
      };
7
      const headerName = "Guests";
      const buttonsHeader = [
        <CSVLink data={dataToCsv} filename={"guests.csv"}
        ><Button   variant="contained" size="small" style={{
          borderRadius: 35,
          color: 'black',
          backgroundColor: "white",
          padding: "3px 14px",
          boxShadow: "none",
          border: "1px solid #E7E7EB",

      }}
        key="download"  startIcon={<GetAppIcon/>} >Download CSV
        </Button></CSVLink>,
        <Button size="small" variant="contained"  key="add" onClick={handleOpen}  startIcon={<AddIcon/>}  style={{
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
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div> Add Guest</div>
          <form>
            <label  > Name</label>
            <input placeholder="Enter Name" type="text" name="name" />

            <label  > Email</label>
            <input  placeholder="Enter Email" type="text" name="email" />
            <label  > Phone Number</label>
            <input  placeholder="Add Phone number" type="text" name="phone" />
          </form>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Guest
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
    </>
  );
};

export default GuestPage;

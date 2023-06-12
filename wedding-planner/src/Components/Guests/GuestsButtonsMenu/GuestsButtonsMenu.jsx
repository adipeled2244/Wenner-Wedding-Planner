
import { CSVLink } from "react-csv";
import Button from "@mui/material/Button";
import GetAppIcon from "@mui/icons-material/GetApp";
import AddIcon from "@mui/icons-material/Add";

export const GuestsButtonsMenu = (props) => {

    const {dataToCsv,handleOpen} = props;
    
return <>
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
    </CSVLink>
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
    </Button>
</>

}



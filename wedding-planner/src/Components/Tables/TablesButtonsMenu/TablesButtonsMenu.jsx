
import React from 'react'
import { CSVLink } from "react-csv";
import Button from "@mui/material/Button";
import GetAppIcon from "@mui/icons-material/GetApp";
import ChairAltIcon from "@mui/icons-material/ChairAlt";
import AddIcon from "@mui/icons-material/Add";
import {getButtonConfig} from '../../../Utils/UIConfig/buttonsConfig'

export  const TablesButtonsMenu=(props) =>{
    const { dataToCsv,onDownload, downloadScreenshot ,handleSavePositions,handleOpen } = props;

  return (
    <>
    <CSVLink data={dataToCsv} filename={"tables.csv"}>
      <Button
      {...getButtonConfig("white", onDownload, "download", <GetAppIcon />)}
      >
        Export CSV{" "}
      </Button>
    </CSVLink>
    <Button
        {...getButtonConfig("white", handleSavePositions, "savePositions", '')}

    >
      Save positions{" "}
    </Button>
    <Button
      {...getButtonConfig("purple", downloadScreenshot, "downloadScreenshot", '')}
    >
      Export positions{" "}
    </Button>
    <Button
      {...getButtonConfig("purple", ()=>{}, "generateSeats", <ChairAltIcon/>)}
    >
      Generate Seats{" "}
    </Button>

    <Button
    {...getButtonConfig("purple", handleOpen, "openModalAddTable", <AddIcon />)}
    >
      Add table{" "}
    </Button>
    </>
  )
}

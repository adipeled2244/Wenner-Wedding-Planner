import classes from "./TablesPage.module.css";
import UserContext from "../Store/user-context";
import { useContext, useEffect, useState, createRef } from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Head from "../Components/Global/Head/Head";
import AddTableForm from "../Components/Tables/AddTableForm/AddTableForm";
import data from "../Utils/Constants/Tables";
import { ToCsv } from "../Utils/utils";
import { toastConfig } from "../Utils/Constants/toastConfig";
import { TablesButtonsMenu } from "../Components/Tables/TablesButtonsMenu/TablesButtonsMenu";

import { useScreenshot, createFileName } from "use-react-screenshot";
import {DragTables} from "../Components/Tables/DragTables/DragTables";
import {toastContainerConfig} from "../Utils/Constants/toastConfig";

const TablesPage = (props) => {
  const { user, updateTables } = useContext(UserContext);
  const tables = user.tables;
  const guests = user.guests;
  const ref = createRef(null);
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });

  const exportPositions = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };
  const downloadScreenshot = () => takeScreenShot(ref.current).then(exportPositions);

  const onDownload = () => {
    console.log("download");
  };

  // modal
  const [openModalAddTable, setOpenModalAddTable] = useState(false);
  const handleOpenModalAddTable = () => setOpenModalAddTable(true);
  const handleCloseModalAddTable = () => setOpenModalAddTable(false);
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 606,
    bgcolor: "background.paper",
    boxShadow: 15,
    p: 4,
  };

  // pageHeight
  const vh = window.innerHeight - 70 - 60 - 1; // minus header and head

  const prepareTables = () => {
    const tablesDB = tables;
    tablesDB &&
      tablesDB.forEach((table) => {
        const jsonTable = data.tables.find((tJ) => tJ.id === table.tableTypeId);
        if (jsonTable) {
          table.shape = jsonTable.shape;
          table.size = jsonTable.size;
          table.tableMaxPeople = jsonTable.tableMaxPeople;
        }
      });
    return tablesDB;
  };
  const [preparedTables, setPreparedTables] = useState(prepareTables());

  const createDataCsvGuestsTables = () => {
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

  let dataToCsv = guests.length>0 ? ToCsv(createDataCsvGuestsTables()) :[]

  const handleSavePositions = async () => {
    try {
      await updateTables(preparedTables);
      toast.success("Tables updated successfully!", toastConfig);
    } catch (err) {
      toast.error("Tables updated failed!", toastConfig);
    }
  };



  const handleDragTable = (e, data) => {
    const tableIndex = preparedTables.findIndex(
      (table) => table._id === data.node.id
    );
    const table = preparedTables[tableIndex];
    table.x = data.lastX;
    table.y = data.lastY;
    const newTables = [...preparedTables];
    newTables[tableIndex] = table;
    setPreparedTables(newTables);
  };


  return (
    <>
      <Head
        buttonsHeader={
          <TablesButtonsMenu
            dataToCsv={dataToCsv}
            onDownload={onDownload}
            downloadScreenshot={downloadScreenshot}
            handleSavePositions={handleSavePositions}
            handleOpen={handleOpenModalAddTable}
          />
        }
        headerName="Tables"
      />
      <div className={classes.tablesContainer} style={{ height: vh }} ref={ref}>
         <DragTables preparedTables={preparedTables} guests={guests} handleDragTable={handleDragTable}  />
      </div>

      <Modal
        open={openModalAddTable}
        onClose={handleCloseModalAddTable}
      >
        <Box sx={modalStyle}>
          <AddTableForm onClose={handleCloseModalAddTable} />
        </Box>
      </Modal>
      <ToastContainer
       {...toastContainerConfig}
      />
      <ToastContainer />
    </>
  );
};

export default TablesPage;

import GroupsIcon from "@mui/icons-material/Groups";
import { Tooltip } from "@mantine/core";
import "react-toastify/dist/ReactToastify.css";
import Draggable from "react-draggable";

import Table from "../../UI/Table";


import TableTooltipCard from "../../Tables/TableTooltipCard/TableTooltipCard";


const DraggableTable = ({
    guests,
    shape,
    size,
    id,
    tableNumber,
    x,
    y,
    selectedMaxSeats,
    handleDragTable
  }) => {
    const tableGuests = guests.filter((guest) => guest.table === tableNumber);
    
    return (
    //   <div
    //   style  = {{
    //     position: "absolute",
    //     top: "0",
    //     left: "0",
    //     width: "0",
    //     height: "0",
    //   }}
    //   >
    <>
        <Draggable onStop={handleDragTable} defaultPosition={{ x: x, y: y }}  
            // bounds={{left: 0, top: 0, right:"100%", bottom:0 }}
            bounds='parent'
            >
          <div
            style={{
              display: "inline-block",
              margin: "15px",
              cursor: "pointer",
            }}
            id={id}
          >
            <Tooltip
              label={
                <TableTooltipCard
                  tableNumber={tableNumber}
                  guests={tableGuests}
                />
              }
              withArrow
              color="white"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <span>Table: {tableNumber}</span> |
                <span
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <GroupsIcon /> {tableGuests.length || 0}/{selectedMaxSeats}
                </span>
              </div>
            </Tooltip>
            <Table key={id} shape={shape} size={size} place={"event"}></Table>
          </div>
        </Draggable>{" "}
        </>
    //   </div>
    );
  };

export default DraggableTable;
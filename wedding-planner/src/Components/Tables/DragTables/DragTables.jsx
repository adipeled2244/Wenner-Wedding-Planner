import React from 'react'
import DraggableTable from "../DraggableTable/DraggableTable";

export const  DragTables=(props) =>{

const {preparedTables, guests, handleDragTable}=props;

  return (
     <>
     {
        preparedTables&& preparedTables.map((table, i) => {
            return (
              <DraggableTable
                key={i}
                id={table._id}
                shape={table.shape}
                size={table.size}
                tableNumber={table.tableNumber}
                selectedMaxSeats={table.selectedMaxSeats}
                x={table.x}
                y={table.y}
                tableMaxPeople={table.tableMaxPeople}
                guests={guests}
                handleDragTable={handleDragTable}
              ></DraggableTable>
            );
          })
     }
     
     </>
  )
}

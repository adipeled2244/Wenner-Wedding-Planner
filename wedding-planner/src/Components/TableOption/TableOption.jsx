import React from "react";
import classes from "./TableOption.module.css";
import Card from '../../UI/Card/Card';

import Table from "../../UI/Table";

const TableOption = ({ shape, maxPeople, sizeDetails,size,onClick, className }) => {
  // console.log(className )
  return (
    <Card className={classes.tableOption +" "+ className} onClick={onClick} >
      <div className={classes.imgTable}><Table shape={shape} size={size} place={"card"} /></div>
      <div className={classes.details}>
        <div>{sizeDetails}</div>
        <div>Max. {maxPeople} guests</div>
      </div>
    </Card>
  );
};

export default TableOption;

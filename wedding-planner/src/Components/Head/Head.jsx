import React from "react";
import classes from "./Head.module.css";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import GetAppIcon from '@mui/icons-material/GetApp';
const Head = (props) => {

  const { buttonsHeader, headerName } = props;


  const buttons =buttonsHeader&&  buttonsHeader.map((buttonItem) => {
    return (
      buttonItem
    );
  })

  return (
    <>
      <div className={classes.head}>
        <h1 className={classes.title}>{headerName}</h1>
       <div className={classes.buttons}> {buttons}</div>
      </div>
    </>
  );
};
export default Head;

import React from "react";
import classes from "./Head.module.css";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import GetAppIcon from '@mui/icons-material/GetApp';
const Head = (props) => {
  // const onDownload = () => {
  //   console.log("download");
  // };
  // const onAdd = () => {
  //   console.log("add");
  // };
  const { buttonsHeader, headerName } = props;

  // const headerName = "Sally and sammy wedding";
  // const buttonsHeader = [
  //   <Button className={`${classes.Button}`}  variant="contained"  key="download" onClick={onDownload}  startIcon={<GetAppIcon/>} >Download </Button>,
  //   <Button className={classes.Button}  variant="contained"  key="download" onClick={onDownload}  startIcon={<AddIcon/>} >Add </Button>,
  //   // { text: "Download",color:"white",icon: GetAppIcon , onClick: onDownload },
  //   // { text: "Add" ,icon:AddIcon, color:"purple" , onClick: onAdd},
  // ];
  const buttons =buttonsHeader&&  buttonsHeader.map((buttonItem) => {
    return (
      buttonItem
    //   <button className={classes.button} key={buttonItem.text} onClick={buttonItem.onClick}>
    //     {buttonItem.text}
    //   </button>
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

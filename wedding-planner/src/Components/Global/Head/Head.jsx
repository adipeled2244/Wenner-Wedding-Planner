import React from "react";
import classes from "./Head.module.css";

const Head = (props) => {
const { buttonsHeader, headerName } = props;

  return (
    <>
      <div className={classes.head}>
        <h1 className={classes.title}>{headerName}</h1>
        <div className={classes.buttons}> {buttonsHeader|| ''}</div>
      </div>
    </>
  );
};
export default Head;

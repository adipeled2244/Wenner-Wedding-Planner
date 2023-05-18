import classes from "./WeddingIssues.module.css";
import '../../GlobalStyle/style'
import React from "react";
import UserContext from "../../Store/user-context";

const WeddingIssues = () => {
const userCtx=React.useContext(UserContext);
const brideName=userCtx.brideName;
const groomName=userCtx.groomName;
const weddingDate=userCtx.weddingDate;
const options = { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
};
const weddingDateFormated=new Date(weddingDate).toLocaleDateString("en-US", options);
const weddingTime=userCtx.weddingTime;
const imgWedding=userCtx.img;  
const weddingVenue=userCtx.weddingVenue;
const weddingVenueAddress=userCtx.weddingVenueAddress;

  return (
    <div className={classes.Weddingissues}>
      <div className={classes.imgContainer}>
        <img
          src={imgWedding}
          className={classes.img}
        ></img>
      </div>
      <div className={classes.text}>
        <div className={classes.names}>
          <div>
          {brideName}<span className={classes.andSign}>&</span>
          </div>
          <div className={classes.down}>{groomName}</div>
        </div>
        <p className={classes.details}>
          <div className={classes.bold}>{weddingDateFormated}</div>
          <div className={classes.bold}>{weddingTime}</div>
          <div className={classes.bold}>{weddingVenue}</div>
          <div className={classes.little} >{weddingVenueAddress}</div>
        </p>
      </div>
    </div>
  );
};
export default WeddingIssues;

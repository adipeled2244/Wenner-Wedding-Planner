import classes from "./WeddingIssues.module.css";
import '../../../GlobalStyle/style'

import React,{useContext} from "react";
import UserContext from "../../../Store/user-context";

const WeddingIssues = () => {
const {user} =  useContext(UserContext);
const {brideName,groomName,weddingDate,weddingTime,img: imgWedding,weddingVenue, weddingVenueAddress} =user;

const options = { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
};
const weddingDateFormated=new Date(weddingDate).toLocaleDateString("en-US", options);

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
        <div className={classes.details}>
          <div className={classes.bold}>{weddingDateFormated}</div>
          <div className={classes.bold}>{weddingTime}</div>
          <div className={classes.bold}>{weddingVenue}</div>
          <div className={classes.little} >{weddingVenueAddress}</div>
        </div>
      </div>
    </div>
  );
};
export default WeddingIssues;

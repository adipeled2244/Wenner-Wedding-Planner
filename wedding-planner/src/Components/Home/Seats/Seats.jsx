import classes from "./Seats.module.css";
import React,{useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import UserContext from "../../../Store/user-context";
import {useState} from "react"
import PieChartCmp from "../PieChartCmp/PieChartCmp";
import Card from "../../UI/Card/Card";

const Seats = () => {
  const calculateGuestsWithTable=()=>{
    const guestsWithTable=guests.filter((guest) =>guest?.table)
    const res= guestsWithTable.reduce(
      (accumulator, currentValue) => accumulator + currentValue.attending,
      0
    );
    return res
  }
 

  const { user } =  useContext(UserContext);
  const { guests } = user;
  const [attendingWithSeats, setAttendingWithSeats] =  useState(calculateGuestsWithTable());


  // useEffect(() => {
  //   calculateGuestsWithTable();
  // }, [guests])

// useEffect(() => {
//   const guestsWithTable=guests.filter((guest) =>guest?.table)
//   const res= guestsWithTable.reduce(
//     (accumulator, currentValue) => accumulator + currentValue.attending,
//     0
//   );
//   setAttendingWithSeats(res)
// }, [guests])

  const colors = ["#5CEB73", "#E7E7EB"];
  const data = {
    attendingWithSeats
  };

  return (
    <Card className={classes.seats}>
      <div className={classes.title}>Seats</div>
      <PieChartCmp
        id="1"
        colors={colors}
        data={data}
        internalTitle={"Taken Seats"}
      />
      <div style={{ marginTop: "43px" }}>
        <Link
          to="/tables"
          style={{
            textDecoration: "none",
            color: "#5F41D9",
          }}
        >
          View list
        </Link>
      </div>
    </Card>
  );
};

export default Seats;

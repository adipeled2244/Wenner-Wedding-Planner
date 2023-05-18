import React from "react";
import classes from "./Seats.module.css";
import { Link } from "react-router-dom";
import PieChartCmp from "../PieChartCmp/PieChartCmp";
import Card from "../Card/Card";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ReactDOMServer from 'react-dom/server';

const Seats = () => {
    const colors = ["#5CEB73", "#E7E7EB"];
    const total = 400;

    const data = {
      takenSits: 300,
      notTakenSits: 0,
    };
    data.notTakenSits = total - data.takenSits;
    const icon =  ReactDOMServer.renderToString(<CheckCircleOutlineIcon />);
    
  return (
    <Card className={classes.seats}>
      <div className={classes.title}>Seats</div>
      <PieChartCmp id="1" colors={colors} data={data} icon={icon} total={total} internalTitle={"Taken Seats"}/>
      <div style={{ marginTop: "43px" }}>
        <Link
          to="tables"
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

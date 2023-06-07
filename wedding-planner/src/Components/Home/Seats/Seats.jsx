import classes from "./Seats.module.css";
import React from "react";
import { Link } from "react-router-dom";
import ReactDOMServer from "react-dom/server";

import PieChartCmp from "../PieChartCmp/PieChartCmp";
import Card from "../../UI/Card/Card";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const Seats = () => {
  const colors = ["#5CEB73", "#E7E7EB"];
  const totalSeats = 400; //! get it from context-  after user signup it will be saved in the context

  const data = {
    takenSeats: 300,
    notTakenSeats: 0,
  };
  data.notTakenSeats = totalSeats - data.takenSeats; //! change it according to conext

  return (
    <Card className={classes.seats}>
      <div className={classes.title}>Seats</div>
      <PieChartCmp
        id="1"
        colors={colors}
        data={data}
        total={totalSeats}
        internalTitle={"Taken Seats"}
      />
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

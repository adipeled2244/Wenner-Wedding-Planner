import classes from "./Seats.module.css";
import React,{useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import UserContext from "../../../Store/user-context";

import PieChartCmp from "../PieChartCmp/PieChartCmp";
import Card from "../../UI/Card/Card";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const Seats = () => {
  const { user } =  useContext(UserContext);
  const { guests } = user;
  const [attendingWithSeats, setAttendingWithSeats] = React.useState(0);

useEffect(() => {
  const guestsWithTable=guests.filter((guest) =>guest?.table)
  const res= guestsWithTable.reduce(
    (accumulator, currentValue) => accumulator + currentValue.attending,
    0
  );
  setAttendingWithSeats(res)
}, [guests])

  const colors = ["#5CEB73", "#E7E7EB"];

  const data = {
    attendingWithSeats:attendingWithSeats
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

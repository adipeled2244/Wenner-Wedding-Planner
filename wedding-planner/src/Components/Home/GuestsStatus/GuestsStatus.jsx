import classes from "./GuestsStatus.module.css";
import React  from "react";
import UserContext from "../../../Store/user-context";

import PieChartCmp from "../PieChartCmp/PieChartCmp";
import Card from "../../UI/Card/Card";
import StatusAttending from "../StatusAttending/StatusAttending";
import { Link } from "react-router-dom";

const GuestsStatus = () => {
  const { user } = React.useContext(UserContext);
  const { guests } = user;

  const attending = guests.reduce(
    (accumulator, currentValue) => accumulator + currentValue.attending,
    0
  );
  const notAttending = guests.filter(
    (guest) => guest.status === "notAttending"
  ).length;
  const notReplied = guests.filter(
    (guest) => guest.status === "notReplied"
  ).length;
  const total = guests.length;
  const colors = ["#5CEB73", "#FF9800", "#E7E7EB"];
  const graphData = {
    attending: attending,
    notAttending: notAttending,
  };
  const data = {
    attending,
    notAttending,
    notReplied,
  };

  return (
    <Card className={classes.guestsStatusess}>
      <div className={classes.title}>Guests Status</div>
      <PieChartCmp
        id="2"
        data={graphData}
        colors={colors}
        total={total}
        internalTitle={"Attending"}
      />
      <StatusAttending data={data} total={total} />
      <Link to="guests" style={{ textDecoration: "none", color: "#5F41D9" }}>
        View list
      </Link>
    </Card>
  );
};

export default GuestsStatus;

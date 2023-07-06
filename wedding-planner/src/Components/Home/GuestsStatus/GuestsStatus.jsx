import classes from "./GuestsStatus.module.css";
import React,{useContext}  from "react";
import UserContext from "../../../Store/user-context";

import PieChartCmp from "../PieChartCmp/PieChartCmp";
import Card from "../../UI/Card/Card";
import StatusAttending from "../StatusAttending/StatusAttending";
import { Link } from "react-router-dom";

const GuestsStatus = () => {
  const { user } = useContext(UserContext);
  const { guests } = user;

  const attending = guests?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.attending,
    0
  );
  const notAttending = guests?.filter(
    (guest) => guest.status === "notAttending"
  ).length;
  const notReplied = guests?.filter(
    (guest) => guest.status === "notReplied"
  ).length;

  const invitationSent = guests?.filter(
    (guest) => guest.invitation === true
  ).length;

  const graphData = {
    attending: attending,
    notAttending: notAttending,
  };

  const totalInvitations = guests?.length ;
  const colors = ["#5CEB73", "#FF9800", "#E7E7EB"];

 
  const statusData = {
    attending:attending|| 0,
    notAttending:notAttending ||0,
    notReplied:notReplied ||0,
    invitationSent:invitationSent ||0,
  };

  return (
    <Card className={classes.guestsStatusess}>
      <div className={classes.title}>Guests Status</div>
      <PieChartCmp
        id="attending"
        data={graphData}
        colors={colors}
        total={totalInvitations }
        internalTitle={"Attending"}
      />
      <StatusAttending data={statusData} totalInvitations={totalInvitations} />
      <Link to="/guests" className={classes.viewList} >
        View list
      </Link>
    </Card>
  );
};

export default GuestsStatus;

import React, { useMemo } from 'react';
import classes from './GuestsStatuses.module.css';
import PieChartCmp from '../PieChartCmp/PieChartCmp';
import Card from '../Card/Card';
import StatusAttending from '../StatusAttending/StatusAttending';
import {Link} from 'react-router-dom';
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ReactDOMServer from 'react-dom/server';
import UserContext from '../../Store/user-context';
const GuestsStatuses=()=>{
  const userCtx=React.useContext(UserContext);
//   const attending =useMemo(()=>userCtx.guests.filter(guest=>guest.status==="attending").length,[userCtx.guests]);
//   const notAttending=useMemo(()=>userCtx.guests.filter(guest=>guest.status==="notAttending").length,[userCtx.guests]) 
//   const notReplied=useMemo(()=>userCtx.guests.filter(guest=>guest.status==="notReplied").length,[userCtx.guests])
// const total=useMemo(()=>userCtx.guests.length,[userCtx.guests])
  const attending=userCtx.guests.reduce((accumulator, currentValue) => accumulator + currentValue.attending, 0);
  const notAttending=userCtx.guests.filter(guest=>guest.status==="notAttending").length;
  const notReplied=userCtx.guests.filter(guest=>guest.status==="notReplied").length;
  const total=userCtx.guests.length;
    const colors = ["#5CEB73", "#FF9800", "#E7E7EB"];
    const dataGraph = {
      attending: attending,
      notAttending: notAttending,
    };
    const data = {
      attending: attending,
      notAttending: notAttending,
      notReplied: notReplied,
    };
    const icon =  ReactDOMServer.renderToString(<CheckCircleOutlineIcon />);
    // const total = 400;

    return <Card className={classes.guestsStatusess}>
        <div className={classes.title}>Guests Status</div>
        <PieChartCmp id="2" data={dataGraph} colors={colors} icon={icon} total={total}  internalTitle={"Attending"} />
        <StatusAttending data={data} total={total} />
        <Link to="guests" style={{ textDecoration: 'none', color: '#5F41D9' }}>View list</Link>
    </Card>
} 

export default GuestsStatuses;
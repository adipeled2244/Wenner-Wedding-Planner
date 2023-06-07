import React, { useMemo } from 'react';
import classes from './GuestsStatuses.module.css';
import PieChartCmp from '../PieChartCmp/PieChartCmp';
import Card from '../../Card/Card';
import StatusAttending from '../StatusAttending/StatusAttending';
import {Link} from 'react-router-dom';
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ReactDOMServer from 'react-dom/server';
import UserContext from '../../../Store/user-context';
const GuestsStatuses=()=>{
  const {user}=React.useContext(UserContext);
  const {guests}= user


  const attending=guests.reduce((accumulator, currentValue) => accumulator + currentValue.attending, 0)
  const notAttending= guests.filter(guest=>guest.status==="notAttending").length
  const notReplied= guests.filter(guest=>guest.status==="notReplied").length
  const total= guests.length

  // const attending=guests? guests.reduce((accumulator, currentValue) => accumulator + currentValue.attending, 0):0;
  // const notAttending=guests? guests.filter(guest=>guest.status==="notAttending").length:0;
  // const notReplied=guests? guests.filter(guest=>guest.status==="notReplied").length:0;
  // const total= guests ?guests.length:0;
    const colors = ["#5CEB73", "#FF9800", "#E7E7EB"];
    const dataGraph = {
      attending: attending,
      notAttending: notAttending,
    };
    const data = {
      attending,
       notAttending,
       notReplied,
    };
    const icon =  ReactDOMServer.renderToString(<CheckCircleOutlineIcon />);

    return <Card className={classes.guestsStatusess}>
        <div className={classes.title}>Guests Status</div>
        <PieChartCmp id="2" data={dataGraph} colors={colors} icon={icon} total={total}  internalTitle={"Attending"} />
        <StatusAttending data={data} total={total} />
        <Link to="guests" style={{ textDecoration: 'none', color: '#5F41D9' }}>View list</Link>
    </Card>
} 

export default GuestsStatuses;
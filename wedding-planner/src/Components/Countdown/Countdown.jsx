import React, { useEffect, useState } from "react";
import moment from "moment";
import classes from "./Countdown.module.css";
import UserContext from "../../Store/user-context";

// to do: change from this date to props
 const Countdown = (props) => {
  const userCtx=React.useContext(UserContext);
  const targetTime = moment(userCtx.weddingDate);

  const [currentTime, setCurrentTime] = useState(moment());
  const timeBetween = moment.duration(targetTime.diff(currentTime));
  const [isToday,setIsToday]=useState(false)
// to do: ad like today: 0 dazays
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeBetween.days() === 0) { 
      setIsToday(true)
    }
  }, [timeBetween.days()]);
  return (

      <div className={classes.countdown}>
        {/* <span>{timeBetween.years()}yr </span>
        <span>{timeBetween.months()}m </span> */}
         <div className={classes.leftLeaf}></div>
       { isToday&&<div className={classes.today}>Today</div>}
       {!isToday&&<div className={classes.container}>
          <div className={classes.number}>{timeBetween.months()}</div>
          <span className={classes.titleCountdown}>Months</span>
        </div>}
        {!isToday&&<div className={classes.container}>
          <div className={classes.number}>{timeBetween.days()}</div>
          <span className={classes.titleCountdown}>Days</span>
        </div>}
        {!isToday&&<div className={classes.container}>
          <div  className={classes.number}>{timeBetween.hours()}</div>
          <span className={classes.titleCountdown}>Hours</span>
        </div>}
        {!isToday&&<div className={classes.container}>
          <div  className={classes.number}>{timeBetween.minutes()}</div>
          <span className={classes.titleCountdown}>Minutes</span>
        </div>}
        {!isToday&&<div className={classes.container}>
          <div  className={classes.number}>{timeBetween.seconds()}</div>
          <span className={classes.titleCountdown}>Seconds</span>
        </div>}
        <div className={classes.rightLeaf}></div>
      </div>
  );
};

export default Countdown;
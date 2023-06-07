import classes from "./Countdown.module.css";
import React, { useEffect, useState ,useContext} from "react";
import moment from "moment";
import UserContext from "../../../Store/user-context";

const Countdown = (props) => {
  const { user } =  useContext(UserContext);
  const targetTime = moment(user.weddingDate);

  const [currentTime, setCurrentTime] = useState(moment());
  const timeBetween = moment.duration(targetTime.diff(currentTime));
  const [isToday, setIsToday] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeBetween.days() === 0) {
      setIsToday(true);
    }
  }, [timeBetween.days()]);

  const renderCountdownElement = (value, label) => {
    return (
      <div className={classes.container}>
        <div className={classes.number}>{value}</div>
        <span className={classes.titleCountdown}>{label}</span>
      </div>
    );
  };

  return (
    <div className={classes.countdown}>
      <div className={classes.leftLeaf}></div>
      {isToday && <div className={classes.today}>Today</div>}
      {!isToday && timeBetween.isValid() && (
        <>
          {renderCountdownElement(timeBetween.months(), "Months")}
          {renderCountdownElement(timeBetween.days(), "Days")}
          {renderCountdownElement(timeBetween.hours(), "Hours")}
          {renderCountdownElement(timeBetween.minutes(), "Minutes")}
          {renderCountdownElement(timeBetween.seconds(), "Seconds")}
        </>
      )}
      <div className={classes.rightLeaf}></div>
    </div>
  );
};

export default Countdown;

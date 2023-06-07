
import React from 'react';
import GuestsStatus from '../GuestsStatus/GuestsStatus';
import Seats from '../Seats/Seats';
import classes from './Statuses.module.css';
const Statuses= () => {
return  <div className={classes.statuses}>
    <GuestsStatus/>
    <Seats/>
</div>

}

export default Statuses;

import React from 'react';
import GuestsStatuses from '../GuestStatuses/GuestsStatuses';
import Seats from '../Seats/Seats';
import classes from './Statuses.module.css';
const Statuses= () => {
return  <div className={classes.statuses}>
    <GuestsStatuses/>
    <Seats/>
</div>

}

export default Statuses;
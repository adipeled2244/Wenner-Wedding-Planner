import React from 'react';
import classes from './TableTooltipCard.module.css';
import Card from '../Card/Card';

const TableTooltipCard=({tableNumber,guests})=>{
let data=[]
    if(guests.length){
        data=guests.map(guest=> <div> {guest.name} {" "} {guest.attending===1? '' : `+${guest.attending-1}` } </div>)
    }
    return <div className={classes.tableTooltipCard}>
           <h1>Table {tableNumber}</h1>
           <div className={classes.details}>
            {
                data.length ? data : <div>No guests</div>
            }
              </div>
    </div>

}

export default TableTooltipCard;
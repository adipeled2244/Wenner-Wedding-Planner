
import React from 'react';
import Card from '../../UI/Card/Card';
import Countdown from '../Countdown/Countdown';
import classes from './WeddingDetails.module.css';
import WeddingIssues from '../WeddingIssues/WeddingIssues';
const WeddingDetails = () => {
 return <Card className={classes.WeddingDetails}>
   <Countdown/>
    <WeddingIssues/>
 </Card>
}

export default WeddingDetails;

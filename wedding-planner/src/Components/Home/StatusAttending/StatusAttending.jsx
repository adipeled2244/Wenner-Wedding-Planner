import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import classes from "./StatusAttending.module.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LoopTwoToneIcon from "@mui/icons-material/LoopTwoTone";

//! TO DO:  OUT TO COMPONENT

const StatusAttending = ({data,totalInvitations}) => {

  const attending= data.attending;
  const notAttending= data.notAttending;
  const notReplied= data.notReplied;
  const invitationSent= data.invitationSent;
  return (
    <div className={classes.statuses}>
      <section className={classes.box}>
        <CheckCircleOutlineIcon style={{ color: "#009317" }} />
        <div className={classes.attendingLine}></div>
        <div className={classes.numbers}>
          <div className={classes.number}>{attending}</div>
          <div  className={classes.status}> Attending</div>
        </div>
      </section>
      <section className={classes.box}>
        <HighlightOffIcon style={{ color: "#FF9800" }} />
        <div className={classes.notAttendLine}></div>
        <div className={classes.numbers}>
          <div className={classes.number}>{notAttending}</div>
          <div  className={classes.status}>Not attending</div>
        </div>
      </section>
      <section className={classes.box}>
        <LoopTwoToneIcon style={{ color: "#716E88" }} />
        <div className={classes.notRespondLine}></div>
        <div className={classes.numbers}>
          <div className={classes.number}>{notReplied}</div>
          <div  className={classes.status}>Not Replied</div>
        </div>
      </section>
      <section className={classes.box}>
        <MailOutlineIcon style={{ color: "#9077F6" }} />
        <div className={classes.invitiationLine}></div>
        <div className={classes.numbers}>
          <div className={classes.number}>{invitationSent}</div>
          <div className={classes.status}>Invitations sent</div>
        </div>
      </section>
    </div>
  );
};

export default StatusAttending;

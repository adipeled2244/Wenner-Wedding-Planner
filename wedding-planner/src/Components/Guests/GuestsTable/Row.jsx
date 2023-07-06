
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import classes from "./Row.module.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
export const  Row = (props) => {
const { row, index, isItemSelected, handleCheckboxClick,labelId  } = props;

    return <TableRow
    aria-checked={isItemSelected}
    tabIndex={-1}
    key={index}
    selected={isItemSelected} 
  >
    <TableCell padding="checkbox">
      <Checkbox
        onClick={(event) => handleCheckboxClick(event, row._id)}
        checkedIcon={<CheckBoxOutlinedIcon />}
        sx={{
          "&.Mui-checked": {
            color: "#ffffff",
          },
          "& .MuiSvgIcon-root": {
            color: "#9077F6",
          },
        }}
        checked={isItemSelected}
        inputProps={{
          "aria-labelledby": labelId,
        }}
      />
    </TableCell>
    <TableCell
      component="th"
      id={labelId}
      scope="row"
      padding="none"
    >
      {row.name}
    </TableCell>
    <TableCell align="left">{row.side==="brideAndGroom"? "bride And groom" :row.side }</TableCell>
    <TableCell align="left">{row.group}</TableCell>
    <TableCell align="left">{row.email}</TableCell>
    <TableCell align="left">{row.phone}</TableCell>
    <TableCell align="left">
      {row.table === 0 ? "" : row.table}
    </TableCell>
    <TableCell align="left">
      {" "}
      {row.invitation && (
        <div className={classes.invitation}>
          {" "}
          <CheckCircleOutlineOutlinedIcon fontSize="small" />{" "}
          <span>sent</span>
        </div>
      )}
      {!row.invitation && (
        <div className={classes.invitation}>
          {" "}
          {/* <CheckCircleOutlineOutlinedIcon fontSize="small" />{" "} */}
          <span>Not sent yet</span>
        </div>
      )}
    </TableCell>
    <TableCell align="left">
      {row.status =="attending" && (
        <div className={classes.invitation}>
          {" "}
          <CheckCircleOutlineOutlinedIcon
            sx={{
              color: "#009317",
            }}
            fontSize="small"
          />{" "}
          <span
            style={{
              color: "#009317",
            }}
          >
            {row.attending}
          </span>
        </div>
      )}
      {row.status =="notAttending"  && (
        <div className={classes.invitation}>
         
            <HighlightOffIcon
              sx={{
                color: "#cf142b",
              }}
              fontSize="small"
            />
         
        </div>
      )}
       {row.status =="notReplied"  && (
        <div className={classes.invitation}>
         
           Not Replied
          
        </div>
      )}
    </TableCell>
    <TableCell align="left">
      {" "}
      <div className={classes.actions}>
        <Tooltip title="Send Invitation">
          <ForwardToInboxOutlinedIcon
            fontSize="small"
            sx={{ cursor: "pointer" }}
            onClick={() => {}}
          />
        </Tooltip>
        <Tooltip title="Delete">
          <DeleteOutlineOutlinedIcon
            fontSize="small"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              console.log("delete");
            }}
          />
        </Tooltip>
      </div>
    </TableCell>
  </TableRow>


}

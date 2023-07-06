import React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import classes from "./TableTitleToolbar.module.css";
import { getButtonConfig } from "../../../Utils/UIConfig/buttonsConfig";

export const TableTitleToolbar = (props) => {
  const { numSelected, totalGuests, sendInvitations } = props;

  return (
    <div className={classes.tableToolbar}>
      <div className={classes.title}>
        {numSelected}{" "}
        <span className={classes.miniTitle}>out of {totalGuests}</span> Guests
        selected
      </div>
      <Button
        {...getButtonConfig(
          "white",
          sendInvitations,
          "sendInvitations",
          <SendIcon />
        )}
      >
       Send arrival confirmation 
      </Button>
    </div>
  );
};

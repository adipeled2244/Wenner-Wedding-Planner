import classes from "./Checklist.module.css";
import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../../Store/user-context";

import Card from "../../UI/Card/Card";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { toast } from "react-toastify";
import { toastConfig } from "../../../Utils/Constants/toastConfig";

const Checklist = () => {
  const { user, updateChecklist } = useContext(UserContext);
  const checklist = user.checklist;
  const [internalCheckList, setInternalCheckList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [checkedNumber, setCheckedNumber] = useState(0);

  // initizlize checklist from store.
  useEffect(() => {
    if (checklist) {
      setInternalCheckList(checklist);
    }
  }, [checklist]);

  useEffect(() => {
    const checkedTasksNumber = internalCheckList.filter(
      (item) => item.checked
    ).length;
    setCheckedNumber(checkedTasksNumber);
  }, [internalCheckList]);

  const handleCheckboxChange = (index, checked) => {
    const newCheckList = [...internalCheckList];
    newCheckList[index].checked = checked;
    setInternalCheckList(newCheckList);
  };

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleKeyPressAddTask = (event) => {
    if (event.key === "Enter") {
      setNewTask(event.target.value);
      setInternalCheckList([
        ...internalCheckList,
        { label: event.target.value, checked: false },
      ]);
      setNewTask("");
    }
  };

  const handleClearChecklist = async () => {
    setInternalCheckList([]);
    // await updateChecklist([]);
    // in comment in order to not clear the checklist in the backend
  };

  const handleSaveChangesChecklist = async (event) => {
    try {
      await updateChecklist(internalCheckList);
      toast.success("Checklist updated successfully!", toastConfig);
    } catch (err) {
      toast.error("Checklist updating failed!", toastConfig);
    }
  };

  const renderChecklist = (
    <FormGroup>
      { internalCheckList.map((task, index) => {
        return (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={task.checked}
                checkedIcon={<CheckBoxOutlinedIcon />}
                sx={{
                  "&.Mui-checked": {
                    color: "#ffffff",
                  },
                  "& .MuiSvgIcon-root": {
                    color: "#9077F6",
                  },
                }}
                onChange={(event) => {
                  handleCheckboxChange(index, event.target.checked);
                }}
              />
            }
            label={task.label}
          />
        );
      })}
    </FormGroup>
  );

  const inputNewChecklistElement = (
    <div>
      <input
        type="text"
        value={newTask}
        className={classes.inputNewChecklistElement}
        onChange={handleInputChange}
        onKeyDown={handleKeyPressAddTask}
        placeholder="Type to add new task"
      />
    </div>
  );

  return (
        <Card className={classes.checklist}>
          <header className={classes.title}>
            Checklist{" "}
            {checkedNumber > 0 && (
              <span className={classes.numbers}>
                {checkedNumber}/{0 || internalCheckList.length}
              </span>
            )}
          </header>
          <div className={classes.list}>
            {renderChecklist}
            {inputNewChecklistElement}
          </div>
          <footer className={classes.actions}>
            <button onClick={handleClearChecklist}>Clear tasks</button>
            <button onClick={handleSaveChangesChecklist}>Save changes</button>
          </footer>
        </Card>
  );
};

export default Checklist;

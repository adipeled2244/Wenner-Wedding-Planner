import React, { useEffect } from "react";
import Card from "../Card/Card";
import classes from "./Checklist.module.css";
import { purple } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from '@mui/material/Button';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import UserContext from "../../Store/user-context"; 

const Checklist = (props) => {
  const {user:{
    checklist,
  },    updateChecklist}=React.useContext(UserContext);

  // const CHECKLIST = [
  //   { label: "DG", checked: true },
  //   { label: "Hair", checked: true },
  //   { label: "Dress", checked: true },
  //   { label: "Food tasting", checked: false },
  //   { label: "Alcohol", checked: false },
  //   { label: "DG", checked: true },
  // ];

  const [internalCheckList, setInternalCheckList] = useState( []);

    useEffect(() => {
      if(checklist){
        setInternalCheckList(checklist)
      }
   
    }, [checklist]);


  const [newTask, setNewTask] = useState('');
  const [checkedNumber, setCheckedNumber] = useState( internalCheckList.filter((item) => item.checked).length);

  useEffect(() => {
    const checked= internalCheckList.filter((item) => item.checked).length;
    setCheckedNumber(checked);
  }, [internalCheckList]);

  // useEffect(() => {
  //   const checked= checkList.filter((item) => item.checked).length;
  //   setCheckList(userCtx.checklist)

  // }, []);


  const onChangeHandler = (index, checked) => {
    const newCheckList = [...internalCheckList];
    newCheckList[index].checked = checked;
    setInternalCheckList(newCheckList);
    //to do:  send update to backend 
  };


  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };



  const handleKeyPressAddTask = (event) => {
    if (event.key === 'Enter') {
        setNewTask(event.target.value);
        setInternalCheckList([...internalCheckList, { label: event.target.value, checked: false }])
        setNewTask('');
         //to do:  send update to backend to all tasks
    }
  };

  const handleClear = () => {
    setInternalCheckList([]);
    }  

    const handleDone = (event) => {
        //to do:  send update to backend to all tasks
       updateChecklist(internalCheckList)

    }
  return (
    <div className={classes.third}>
    <Card className={classes.checklist}>
      <div className={classes.title}>
        Checklist<span className={classes.numbers}> {checkedNumber}/{0 || internalCheckList.length}</span>
      </div>
    <div className={classes.list}>
      <FormGroup>
        {internalCheckList.map((task, index) => {
        
          return (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={task.checked}
                  checkedIcon={<CheckBoxOutlinedIcon />}
                  sx={{
                      "&.Mui-checked":{
                           color: "#ffffff"
                      },
                      "& .MuiSvgIcon-root":{
                          color: "#9077F6"
                      },
                     
                  }}
                  onChange={(event) => {
                    onChangeHandler(index, event.target.checked);
                  }}
                />
              }
              label={task.label}
            />
          );
        })}
      </FormGroup>
      <div>
      <input
        type="text"
        value={newTask}
        onChange={handleInputChange}
        onKeyDown={handleKeyPressAddTask}

        placeholder="Type to add a task"
        style={{ border:0, outline: 0, width: '100%', height: '30px', padding: '10px' }}
      />
    </div>
      </div>
   
    <div className={classes.actions}>
        <button onClick={handleClear}>Clear tasks</button>
        <button onClick={handleDone}>Save changes</button>
    </div>
    </Card>
    </div>
  );
};

export default Checklist;
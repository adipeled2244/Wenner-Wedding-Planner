import { TextField, FormControl, Button } from "@mui/material";
import { Link } from "react-router-dom";

import Card from "../UI/Card/Card";
import classes from "./LoginForm.module.css";
import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../Store/user-context";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import { toastContainerConfig } from "../../Utils/Constants/toastConfig";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const res= await handleLogin(username, password);
    console.log(res)
   if(res.status===200){
    navigate("/home")
   }
   else{
    toast.error(res.message)
   }
  
  };


  return (
    <>
    <Card className={classes.signupForm}>
      <div className={classes.title}> Login</div>
      <form>
        <TextField
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
          color="secondary"
          type="text"
          value={username}
          sx={{ mb: 2, backgroundColor: "white", border: "white" }}
          size="small"
          fullWidth
        />
        <TextField
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="password"
          value={password}
          fullWidth
          size="small"
          sx={{ mb: 2, backgroundColor: "white", border: 0 }}
        />

        <Button
          variant="contained"
          color="secondary"
          onClick={(e) => handleLoginSubmit(e)}
        >
          Login
        </Button>
      </form>
      <small>
        Doesn't have an account? <Link to="/signup">Signup</Link>
      </small>
    </Card>
    <ToastContainer
       {...toastContainerConfig}
      />
      <ToastContainer />
  </>
  );
};

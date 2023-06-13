import { TextField, FormControl, Button } from "@mui/material";
import { Link } from "react-router-dom";

import Card from "../UI/Card/Card";
import classes from "./LoginForm.module.css";
import React, { useState, useRef } from "react";


export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleSignUpSubmit = () => {};



  return (
    <Card className={classes.signupForm}>
      <div className={classes.title}> Login</div>
      <form onSubmit={handleSignUpSubmit} action={<Link to="/" />}>

        
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

          //   variant="filled"
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
      
        <Button variant="contained" color="secondary" type="submit">
          Login
        </Button>
      </form>
      <small>
        Doesn't have an account? <Link to="/signup">Signup</Link>
      </small>
    </Card>
  );
};

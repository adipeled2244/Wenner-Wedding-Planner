import { TextField, FormControl, Button } from "@mui/material";
import { Link } from "react-router-dom";

import Card from "./../UI/Card/Card";
import classes from "./SignUpForm.module.css";
import React, { useState, useRef } from "react";
import { useForm } from "@mantine/form";

export const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invitationSubTitle, setInvitationSubTitle] = useState("");
  const [brideName, setBrideName] = useState("");
  const [groomName, setGroomName] = useState("");
  const [weddingDate, setWeddingDate] = useState("");
  const [weddingTime, setWeddingTime] = useState("");
  const [weddingVenue, setWeddingVenue] = useState("");
  const [weddingVenueAddress, setWeddingVenueAddress] = useState("");
  const [coupleImage, setCoupleImage] = useState("");
  const inputImgRef = useRef(null);

  const handleSignUpSubmit = () => {};

  const handleImageClick = () => {
    inputImgRef.current.click();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setCoupleImage(e.target.files[0]);
  };

  return (
    <Card className={classes.signupForm}>
      <div className={classes.title}> SignUp</div>
      <form onSubmit={handleSignUpSubmit} action={<Link to="/" />}>

        <div onClick={handleImageClick} className={classes.imgContainer}>
        <div className={classes.changePhoto}>Change photo </div>    
          {coupleImage ? (
            <img
              src={URL.createObjectURL(coupleImage)}
              alt="logo"
              className={classes.coupleImg}
            />
          ) : (
            <img  src="https://cdn.pixabay.com/photo/2012/04/24/23/52/wedding-41210_1280.png" alt="logo" className={classes.imgBefore} />
          )}
          <input
            type="file"
            ref={inputImgRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>
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
        <div className={classes.names}>
          <TextField
            label="Bride's name"
            onChange={(e) => setBrideName(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="text"
            value={brideName}
            size="small"
            sx={{ mb: 2, backgroundColor: "white", border: 0 }}
          />
          <TextField
            label="Groom's name"
            onChange={(e) => setGroomName(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="text"
            size="small"
            value={groomName}
            sx={{ mb: 2, backgroundColor: "white", border: 0 }}
          />
        </div>
        {/* weddingDate time */}
        
        <TextField
          label="Wedding Venue"
          onChange={(e) => setWeddingVenue(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="password"
          value={weddingVenue}
          fullWidth
          size="small"
          sx={{ mb: 2, backgroundColor: "white", border: 0 }}
        />
        <TextField
          label="Wedding Venue Address"
          onChange={(e) => setWeddingVenueAddress(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="password"
          value={weddingVenueAddress}
          fullWidth
          size="small"
          sx={{ mb: 2, backgroundColor: "white", border: 0 }}
        />

        <Button variant="contained" color="secondary" type="submit">
          Sign up
        </Button>
      </form>
      <small>
        Have an account? <Link to="/">Login</Link>
      </small>
    </Card>
  );
};

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { userRouter } = require("./routers/userRouter");
const { authRouter } = require("./routers/authRouter");
const { checkAuth } = require("./utils/auth");

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  next();
});

app.use("/api/auth", authRouter);
app.use(checkAuth);

app.use("/api/users", userRouter);

app.listen(port, () =>
  console.log(`Express server is running on port ${port}`)
);

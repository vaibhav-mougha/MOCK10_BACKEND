require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.port;
const app = express();
const { connection } = require("./Configs/db");
const { usersRoute } =require("./Routes/Users.Route")
const { authenticate} =require("./Middlewares/authenticate");
const { flightRouter } = require("./Routes/Flight.route");
const { bookingRouter } = require("./Routes/Booking.Route");

/// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);


app.get("/", (req, res) => {
  res.send("Welcome Home Page");
});

// registering and Login of the user
app.use("/",usersRoute)

//Authenticate So that only login users can perform below activity
app.use(authenticate)

//Flight Route
app.use("/api/flights", flightRouter);

//Booking Route
app.use("/", bookingRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to the DB");
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is running at PORT : ${PORT} `);
});

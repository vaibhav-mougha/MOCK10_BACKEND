const express = require("express");
const { BookingModel } = require("../Models/Booking.model");

const bookingRouter = express.Router();

bookingRouter.use(express.json());

// Post Route for allowing logged in  users to user to book flights.
bookingRouter.post("/api/booking", async (req, res) => {
  const payload = req.body;
  try {
    const newFlight = new BookingModel(payload);
    await newFlight.save();
    return res
      .status(201)
      .json({ newFlight, message: "Flight Booked Successfully" });
  } catch (err) {
    console.log("err :>> ", err);
    res.send({ msg: err });
  }
});

// Get Route will list all the bookings so far with the user and flight details.
bookingRouter.get("/api/dashboard", async (req, res) => {
  try {
    let data = await BookingModel.find().populate(["user", "flight"]);
    res.status(200).json({ data, message: "List of all available Flights." });
  } catch (err) {
    console.log("err :>> ", err);
    res.send({ err: err });
  }
});

module.exports = {
  bookingRouter,
};

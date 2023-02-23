const express = require("express");
const { FlightModel } = require("../Models/Flight.model");

const flightRouter = express.Router();

flightRouter.use(express.json());

// Get Route for returning the list of all available flights.
flightRouter.get("/", async (req, res) => {
  try {
    let data = await FlightModel.find();
    res.status(200).json({ data, message: "List of all available Flights." });
  } catch (err) {
    console.log("err :>> ", err);
    res.send({ err: err });
  }
});

//  Get Route for returning the details of a specific flight identified by its ID.
flightRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const data = await FlightModel.findById(id);
  res.status(200).json({
    data,
    message: `Details of a specific flight identified by its ID:${id}`,
  });
});

// Post Route for allowing logged in  users to add new flights to the system.
flightRouter.post("/", async (req, res) => {
  const payload = req.body;
  try {
    const newFlight = new FlightModel(payload);
    await newFlight.save();
    res
      .status(201)
      .json({ newFlight, message: "New Flight successfully Added" });
  } catch (err) {
    console.log("err :>> ", err);
    res.send({ msg: err });
  }
});

// Path Route for allowing users to update the details of a specific flight identified by its ID.
flightRouter.patch("/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;

  try {
    await FlightModel.findByIdAndUpdate({ _id: id }, payload);
    res.status(204).send({
      payload,
      message: `Update the details of a specific flight identified by its ID : ${id} `,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error,
      message: "Something went wrong",
    });
  }
});

flightRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await FlightModel.findByIdAndDelete({ _id: id });
    res.status(202).send({
      message: `Deleted the flight with ID : ${id} `,
    });
  } catch {
    res.send("err");
  }
});

module.exports = {
  flightRouter,
};

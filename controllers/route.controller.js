import { validationResult } from "express-validator";
import { SUCCESS, ERROR, FAIL } from "../utils/httpStatus.js";
import Route from "../models/Routes.js";
import Driver from "../models/Drivers.js";

async function addRoute(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: FAIL, message: "Validation failed", error: errors.array() });
  }

  const { startLocation, endLocation, distance, estimatedTime } = req.body;

  try {
    const newRoute = new Route({ startLocation, endLocation, distance, estimatedTime });
    await newRoute.save();
    res.status(201).json({ status: SUCCESS, data: newRoute });
  } catch (err) {
    res.status(500).json({ status: ERROR, message: "Failed to add route", error: err });
  }
}

async function completeRoute(req, res){
  const { id } = req.params;

  try {
    const route = await Route.findById(id);
    if (!route) {
      return res.status(404).json({ status: FAIL, message: "Route not found" });
    }

    route.status = "completed";
    await route.save();

    const driver = await Driver.findById(route.assignedDriver);
    driver.history.push({ route: route._id });
    driver.availability = true;
    await driver.save();

    res.status(200).json({ status: SUCCESS, data: route });
  } catch (err) {
    res.status(500).json({ status: ERROR, message: "Failed to complete route", error: err });
  }
}

async function getAllRoutes(req, res) {
  try{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const routes = await Route.find({}, {__v:0}).populate("assignedDriver", "id name licenseType -_id").skip(skip).limit(limit);
    res.status(200).json({ status: SUCCESS, data: routes });
  } catch (err) {
    res.status(500).json({ status: ERROR, message: "Failed to retrieve routes", error: err });
  }
}

export  { addRoute, completeRoute, getAllRoutes };